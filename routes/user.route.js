import { Router } from "express";
import {
  getAllusers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllusers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
