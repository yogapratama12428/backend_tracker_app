import express from "express";
import { createLocation, getLocationById } from "../controller/locationController.js";

const router = express.Router()

router.get('/location/:id', getLocationById )
router.post('/location', createLocation )

export default router