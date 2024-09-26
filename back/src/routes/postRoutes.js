import { Router } from "express";

import {
  createPost,
  getAllPost,
  getPostByID,
  deleteById,
} from "../controllers/postController.js";
import { getUserData } from "../middlewares/userData.js";

const postRouter = Router();

postRouter.get("/post", getAllPost);
postRouter.post("/post", getUserData, createPost);
postRouter.get("/post/:postId", getPostByID);
postRouter.delete("/post/:postId", getUserData, deleteById);

export default postRouter;
