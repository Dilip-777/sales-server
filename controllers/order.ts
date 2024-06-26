import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import bcrypt from "bcrypt";
import ShortUniqueId from "short-unique-id";
import { OrderStatus } from "@prisma/client";
import moment from "moment";

const uid = new ShortUniqueId({ length: 10 });

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, requiredBy, total, totalweight, items, userId } =
      req.body;

    await prisma.order.create({
      data: {
        id: uid.rnd(),
        customerId,
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
      customerId,
      requiredBy,
      total,
      totalweight,
      items,
      remarks,
      vehicleno,
      issueAmount,
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
        customerId,
        requiredBy,
        total,
        totalweight,
        status,
        remarks,
        vehicleno,
        issueAmount,
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

    if (!user)
      return res.status(400).json({ success: false, error: "User not found" });

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
        customer: true,
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
  try {
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
      const endDate = moment(to as string, "DD/MM/YYYY").add(1, "days");
      where.createdAt = {
        gte: moment(from as string, "DD/MM/YYYY").toDate(),
        lte: endDate.toDate(),
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
            customer: true,
            user: true,
          },
        },
        item: true,
      },
    });

    res.status(200).json({ success: true, items });
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
        customer: true,
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
      await prisma.order.delete({
        where: {
          id: id as string,
        },
      });
      return res.status(200).json({ success: true });
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
