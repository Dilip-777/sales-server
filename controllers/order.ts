import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import bcrypt from "bcrypt";
import ShortUniqueId from "short-unique-id";
import { OrderStatus } from "@prisma/client";

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
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    const where: any = {};
    if (user?.role === "SALESMAN") {
      where.userId = userId as string;
    }
    if (user?.role === "DISPATCHER") {
      where.status = {
        in: ["completed", "approved"],
      };
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

export const getOrderItems = async (req: Request, res: Response) => {
  // try {
  const { userId, itemId, from, to } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });
  if (!user)
    return res.status(400).json({ success: false, error: "User not found" });
  let where: any = {};

  if (userId && user.role === "SALESMAN") {
    where.Order = {
      userId: userId as string,
    };
  }
  if (from && to && from !== "Invalid Date" && to !== "Invalid Date") {
    where.createdAt = {
      gte: new Date(from as string),
      lte: new Date(to as string),
    };
  }
  if (itemId) {
    where.itemId = itemId as string;
  }
  const items = await prisma.orderedItem.findMany({
    where: where,
    include: {
      Order: {
        include: {
          company: true,
          user: true,
        },
      },
      item: true,
    },
  });
  console.log(where, "where");

  res.status(200).json({ success: true, items });
  // } catch (error) {
  //   res.status(400).json({ success: false, error });
  // }
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
    const { id, from, to } = req.query;
    if (id) {
      const order = await prisma.order.delete({
        where: {
          id: id as string,
        },
      });
    }
    if (from && to) {
      const orders = await prisma.order.deleteMany({
        where: {
          createdAt: {
            gte: new Date(from as string),
            lte: new Date(to as string),
          },
        },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
