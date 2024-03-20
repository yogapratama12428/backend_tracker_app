import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../controller/userController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { validationuser } from "../middleware/validationuser.js";

const router = express.Router();

router.get("/api/v1/user", getUser);
router.get("/api/v1/user/:id", validationuser, getUserById);
router.post("/api/v1/user", isAdmin, createUser);
router.put("/api/v1/user/:id", isAdmin, editUser);
router.delete("/api/v1/user/:id", deleteUser);

export default router;
