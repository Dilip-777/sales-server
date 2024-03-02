import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category";

const categoryRouter = express.Router();
categoryRouter.get("/getCategories", getCategories);
categoryRouter.post("/create", createCategory);
categoryRouter.post("/delete/:id", deleteCategory);

export default categoryRouter;
