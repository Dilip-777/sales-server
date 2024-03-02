import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import bcrypt from "bcrypt";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { companyId, requiredBy, total, totalweight, items, userId } =
      req.body;

    await prisma.order.create({
      data: {
        id: uid.rnd(),
        companyId,
        requiredBy,
        total,
        totalweight,

        userId,
        items: {
          createMany: {
            data: items,
          },
        },
      },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const {
      id,
      companyId,
      requiredBy,
      total,
      totalweight,
      items,
      userId,
      status,
    } = req.body;

    await prisma.orderedItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    await prisma.order.update({
      where: {
        id: id,
      },
      data: {
        companyId,
        requiredBy,
        total,
        totalweight,
        userId,
        status,
        items: {
          createMany: {
            data: items,
          },
        },
      },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const where: any = {};
    if (userId) {
      where.userId = userId as string;
    }
    const orders = await prisma.order.findMany({
      where,
      include: {
        user: true,
        items: true,
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        items: {
          include: {
            item: true,
          },
        },
        company: true,
        user: true,
      },
    });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
