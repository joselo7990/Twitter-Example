import { Router } from "express";

import { createUser, logIn } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", logIn);

export default userRouter;
