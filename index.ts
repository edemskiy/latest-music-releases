import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRouter from "./routes/auth.routes";
import subsRouter from "./routes/subs.routes";
import artistsRouter from "./routes/artists.routes";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/subs", subsRouter);
app.use("/api/artists", artistsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(
    "/",
    express.static(
      path.join(__dirname, "..", "client", "dist", "music-subs-client")
    )
  );

  app.get("*", (_req: Request, res: Response) => {
    res.sendFile(
      path.resolve(
        __dirname,
        "..",
        "client",
        "dist",
        "music-subs-client",
        "index.html"
      )
    );
  });
}

try {
  const dbURI: string = process.env.MONGODB_URI || "";
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
} catch (error) {
  console.log("mongoConnectionError", error.message);
}
