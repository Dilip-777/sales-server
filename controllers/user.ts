import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const editUser= async (req: Request, res: Response) => {
  try {
    const { id, username, email, role,zone, zoneId} = req.body;
    const user = await prisma.user.update({
        where:{
            id: id,
        },
        data:{
            username:username,
            email:email,
            role: role, 
            zone:zone,
            zoneId: zoneId, 
        }
    }) 
    res.status(201).json({ success: true, user: user});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getUsers= async (req: Request, res: Response) => {
  try {
    const users= await prisma.user.findMany();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteUser= async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user= await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, user: user});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

