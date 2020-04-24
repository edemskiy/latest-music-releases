import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { UserInfo } from "../interfaces";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userToken = req.headers.auth?.toString() || "";
  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userInfo = jwt.verify(userToken, process.env.VERY_PRIVATE_KEY || "");
  req.userId = (<UserInfo>userInfo).userId;
  next();
}

export default authMiddleware;
