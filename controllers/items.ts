import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import bcrypt from "bcrypt";

export const createItem = async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, category, unit, weight } = req.body;
    if (id) {
      const item = await prisma.item.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          price: price,
          description: description,
          category: category,
          unit: unit,
          weight: weight,
        },
      });
      return res.status(200).json({ success: true, item: item });
    }
    const item = await prisma.item.create({
      data: {
        name: name,
        price: price,
        description: description,
        category: category,
        unit: unit,
        weight: weight,
      },
    });
    res.status(201).json({ success: true, item: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json({ success: true, items: items });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, item: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, item: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
