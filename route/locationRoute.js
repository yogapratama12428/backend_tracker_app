import express from "express";
import { createLocation, getLocationById } from "../controller/locationController.js";

const router = express.Router()

router.get('/api/v1/location/:id', getLocationById)
router.post('/api/v1/location', createLocation)

export default router