import express, { NextFunction, Request, Response } from "express";
import { authSchema } from "../helpers/validationSchema";

const router = express.Router(); 

const validateUser = (req:Request , res:Response,next:NextFunction) =>{
    const validate = authSchema.validate(req.body); 
    if(validate.error){
        return res.status(400).json({error:validate.error.message });
    }
    return res.status(200).json({message:"validation successfull"}); 
}

router.get('/validate',validateUser); 

export default router ; 
