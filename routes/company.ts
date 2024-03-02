import express from "express";
import {
  getCompanies,
  getCompany,
  deleteCompany,
  createCompany,
} from "../controllers/company";

const companyRouter = express.Router();

companyRouter.get("/getCompanies", getCompanies);
companyRouter.post("/create", createCompany);
companyRouter.delete("/delete/:id", deleteCompany);
companyRouter.get("/getCompany/:id", getCompanies);

export default companyRouter;
