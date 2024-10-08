import { Router } from "express";

import { createUser, logIn, logOut } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);

export default userRouter;
