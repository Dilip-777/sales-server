import express from "express";
import { deleteUser, getUsers, editUser, getUser } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/get", getUsers);
userRouter.get("/get/:id", getUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/edit", editUser);

export default userRouter;
