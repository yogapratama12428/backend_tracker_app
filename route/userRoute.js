import express from "express";
import {
  getUser,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.get("/user", getUser);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", editUser);
router.delete("/user/:id", deleteUser);

export default router;
