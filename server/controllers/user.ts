import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id, username, email, role, zoneId } = req.body;
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        email: email,
        role: role,
        zoneId: zoneId,
      },
    });
    res.status(201).json({ success: true, user: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        zone: true,
      },
    });
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("sldfjskldfl");
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("delete " + id);
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
