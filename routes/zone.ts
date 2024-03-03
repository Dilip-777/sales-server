import express from "express";

import {
  createZone,
  deleteZone,
  getZones,
} from "../controllers/zone";

const zoneRouter= express.Router();

zoneRouter.get("/getZones", getZones);
zoneRouter.post("/create", createZone);
zoneRouter.delete("/delete/:id", deleteZone);

export default zoneRouter;
