import express from "express";
import {
  createItem,
  createManyItems,
  deleteItem,
  getItem,
  getItems,
} from "../controllers/items";

const itemsRouter = express.Router();

itemsRouter.get("/getItems", getItems);
itemsRouter.post("/create", createItem);
itemsRouter.post("/createMany", createManyItems);
itemsRouter.get("/getItem/:id", getItem);
itemsRouter.delete("/delete/:id", deleteItem);

export default itemsRouter;
