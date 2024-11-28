import { Router } from "express";
import upload from "../multer.js";

import { createUser, logIn, logOut } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", upload.single("profilePicture"), createUser);
userRouter.post("/login", logIn);
userRouter.post("/logout", logOut);

export default userRouter;
