import express from "express"; 
import {
    createUnit, 
    deleteUnit, 
    getUnits,
} from "../controllers/unit"; 

const unitRouter = express.Router(); 
unitRouter.get("/getUnits", getUnits); 
unitRouter.post("/create", createUnit); 
unitRouter.post("/delete/:id",deleteUnit); 

export default unitRouter; 
