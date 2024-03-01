import express from "express";
import {
  createItem,
  deleteItem,
  getItem,
  getItems,
} from "../controllers/items";

const itemsRouter = express.Router();

itemsRouter.get("/getItems", getItems);
itemsRouter.post("/create", createItem);
itemsRouter.get("/getItem/:id", getItem);
itemsRouter.post("/delete/:id", deleteItem);

export default itemsRouter;
