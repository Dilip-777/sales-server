import express from "express";
import {
  getCustomers,
  getCustomer,
  deleteCustomer,
  createCustomer,
  createManyCustomers,
} from "../controllers/customer";

const customerRouter = express.Router();

customerRouter.get("/getCustomers", getCustomers);
customerRouter.post("/create", createCustomer);
customerRouter.delete("/delete/:id", deleteCustomer);
customerRouter.get("/getCustomer/:id", getCustomers);
customerRouter.post("/createMany", createManyCustomers);

export default customerRouter;
