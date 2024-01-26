import express from "express";
import { createDevice, deleteDevice, editDevice, getDevice, getDeviceById } from "../controller/deviceController.js";

const router = express.Router();

router.get('/device', getDevice)
router.get('/device/:id', getDeviceById)
router.post('/device', createDevice)
router.put('/device/:id', editDevice)
router.delete('/device/:id', deleteDevice)

export default router