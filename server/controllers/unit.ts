import { Request, Response } from "express"; 
import prisma from "../prisma/prismaClient"; 

export const createUnit= async(req: Request, res: Response) => {
    try {
        const { id, name, status } = req.body; 
        if(id){
            const unit = await prisma.unit.update({
                where: {
                    id: id, 
                },
                data: {
                    name: name, 
                    status: status,
                },
            }); 
            return res.status(200).json({ success: true, unit: unit}); 
        }
        const unit = await prisma.unit.create({
            data: {
                name : name, 
                status: status, 
            } ,
        }); 
        res.status(201).json({success: true, unit: unit}); 
    }catch (error){
        res.status(400).json({success: false, error: error}); 
    }
}; 

export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await prisma.unit.findMany();
    res.status(200).json({ success: true, units: units});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteUnit= async (req: Request, res: Response) => {
  try {
    const {id}= req.params; 
    const unit= await prisma.unit.delete({
        where: {
            id: id, 
        },
    });
    res.status(200).json({ success: true, unit: unit});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

