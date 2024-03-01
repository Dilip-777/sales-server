import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import bcrypt from "bcrypt";

export const createCompany= async (req: Request, res: Response) => {
  try {
    const { id, name, address, zoneId, status , zone} = req.body;
    if (id) {
      const company= await prisma.company.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          address: address, 
          zoneId: zoneId, 
          status: status, 
          zone: zone, 
        },
      });
      return res.status(200).json({ success: true, company: company});
    }
    const company= await prisma.company.create({
        data: {
            name: name,
            address: address, 
            zoneId: zoneId, 
            status: status, 
            zone: zone, 
        },
    });
    res.status(201).json({ success: true, company: company});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getCompanies= async (req: Request, res: Response) => {
  try {
    const companies= await prisma.company.findMany();
    res.status(200).json({ success: true, companies: companies});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getCompany= async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, company: company});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteCompany= async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, company: company});
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

