import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrderItems,
  getOrders,
  updateOrder,
} from "../controllers/order";

const orderRouter = express.Router();

orderRouter.get("/getOrders", getOrders);
orderRouter.post("/create", createOrder);
orderRouter.get("/getOrder/:id", getOrder);
orderRouter.get("/getOrderItems", getOrderItems);
orderRouter.put("/update", updateOrder);
orderRouter.delete("/delete", deleteOrder);

export default orderRouter;
