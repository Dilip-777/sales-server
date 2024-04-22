import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { id, name, address, zoneId, status } = req.body;
    if (id) {
      const customer = await prisma.customer.update({
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
      return res.status(200).json({ success: true, customer: customer });
    }
    const customer = await prisma.customer.create({
      data: {
        name: name,
        address: address,
        zoneId: zoneId,
        status,
      },
    });
    res.status(201).json({ success: true, customer: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
    console.log(error);
  }
};

export const createManyCustomers = async (req: Request, res: Response) => {
  try {
    const { customers } = req.body;
    await prisma.customer.createMany({
      data: customers,
      skipDuplicates: true,
    });
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
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

    const customers = await prisma.customer.findMany({
      where,
      include: {
        zone: true,
      },
    });
    res.status(200).json({ success: true, customers: customers });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, customer: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await prisma.customer.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, customer: customer });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
