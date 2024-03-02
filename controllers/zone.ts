import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createZone = async (req: Request, res: Response) => {
  try {
    const { id, name, status } = req.body;
    if (id) {
      const zone = await prisma.zone.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          status: status,
        },
      });
      return res.status(200).json({ success: true, zone: zone });
    }
    const zone = await prisma.zone.create({
      data: {
        name: name,
        status,
      },
    });
    res.status(201).json({ success: true, zone: zone });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const getZones = async (req: Request, res: Response) => {
  try {
    const zones = await prisma.zone.findMany();
    res.status(200).json({ success: true, zones: zones });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteZone = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const zone = await prisma.zone.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ success: true, zone: zone });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};
