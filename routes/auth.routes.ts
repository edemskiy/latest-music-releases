import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User, { IUser } from "../models/user.model";

const authRouter: Router = Router();

authRouter.post(
  "/register",
  [check("login").isLength({ min: 6 }), check("password").isLength({ min: 6 })],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    try {
      const { login, password } = req.body;
      const possibleUser: IUser | null = await User.findOne({ login });
      if (possibleUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      const user = new User({ login, password: hashedPassword });

      const newUser = await user.save();

      if (newUser) {
        const token = jwt.sign(
          { userId: user._id },
          process.env.VERY_PRIVATE_KEY || ""
          // { expiresIn: "1h" }
        );
        res.status(201).json({ message: "You succesfully registered", token });
      }
    } catch (e) {
      console.log("Error occured", e);
    }
  }
);

authRouter.post(
  "/login",
  [check("login").exists(), check("password").exists()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    try {
      const { login, password } = req.body;
      const user: IUser | null = await User.findOne({ login });
      if (!user) {
        return res.status(400).json({ message: "Wrong login or password" });
      }

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      if (user.password !== hashedPassword) {
        return res.status(400).json({ message: "Wrong email or password" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.VERY_PRIVATE_KEY || ""
        // { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (e) {
      console.log("Error occured", e);
    }
  }
);

export default authRouter;
