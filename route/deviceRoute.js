import express from "express";
import {
  createDevice,
  deleteDevice,
  editDevice,
  getDevice,
  getDeviceByEmail,
  getDeviceById,
  updateTokenDevice,
} from "../controller/deviceController.js";
import { validationuser } from "../middleware/validationuser.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/api/v1/device", getDevice);
router.get("/api/v1/device/:id", validationuser, getDeviceById);
router.get("/api/v1/mydevice/:userId", validationuser, getDeviceByEmail);
router.post("/api/v1/device", validationuser, createDevice);
router.put("/api/v1/device/:id", validationuser, editDevice);
router.delete("/api/v1/device/:id", deleteDevice);

router.put("/api/v1/updatetoken", validationuser, updateTokenDevice);

export default router;
