import { Router } from "express";

import {
  createComments,
  getComments,
  deleteComments,
} from "../controllers/comentsController.js";
import { getUserData } from "../middlewares/userData.js";

const commentRouter = Router();

commentRouter.post("/comments/:postId", getUserData, createComments);
commentRouter.get("/comments/:postId", getComments);
commentRouter.delete("/comments/:commentId", getUserData, deleteComments);

export default commentRouter;
