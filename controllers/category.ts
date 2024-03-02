import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { id, name, status } = req.body;
    if (id) {
      const category = await prisma.categories.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          status: status,
        },
      });
      return res.status(200).json({ success: true, category });
    }
    const category = await prisma.categories.create({
      data: {
        name: name,
        status: status,
      },
    });
    res.status(201).json({ success: true, category: category });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prisma.categories.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
