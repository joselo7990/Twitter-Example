import express from "express";
import connectDB from "./db.config.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentsRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

import { FRONT_URL } from "./config.js";

// Middleware
app.use(
  cors({
    origin: FRONT_URL, // desde donde permito que le peguen a mi back
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/post", postRouter);
app.use("/comments", commentRouter);

connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log("Servidor corriendo en el puerto 8080");
    });
  })
  .catch((error) => {});
