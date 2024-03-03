import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { id, name, address, zoneId, status } = req.body;
    if (id) {
      const company = await prisma.company.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          address: address,
          zoneId: zoneId,
          status,
        },
      });
      return res.status(200).json({ success: true, company: company });
    }
    const company = await prisma.company.create({
      data: {
        name: name,
        address: address,
        zoneId: zoneId,
        status,
      },
    });
    res.status(201).json({ success: true, company: company });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error); 
  }
};

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    const where: any = {};

    if (!user) {
      return res.status(400).json({ success: false, error: "UnAuthorised" });
    }

    if (user.role === "SALESMAN") {
      where.zoneId = user.zoneId;
    }

    const companies = await prisma.company.findMany({
      where,
      include: {
        zone: true,
      },
    });
    res.status(200).json({ success: true, companies: companies });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, company: company });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, company: company });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
