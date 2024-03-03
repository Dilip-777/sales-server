import express from "express";
import { deleteUser, getUsers, editUser} from "../controllers/user";

const userRouter= express.Router();

userRouter.get("/get", getUsers);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/edit",editUser); 

export default userRouter;
