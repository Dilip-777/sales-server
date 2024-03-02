import express from "express";

import {
  createZone,
  deleteZone,
  getZone,
  getZones,
} from "../controllers/zone";

const zoneRouter= express.Router();

zoneRouter.get("/getZones", getZones);
zoneRouter.post("/create", createZone);
zoneRouter.post("/delete/:id", deleteZone);

export default zoneRouter;
