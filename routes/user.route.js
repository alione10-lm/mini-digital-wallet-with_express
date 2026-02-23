import { Router } from "express";
import {
  getAllusers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/userValidationMiddleware.js";

const router = Router();

router.get("/", getAllusers);
router.post("/", validateUser, createUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.put("/:id", validateUser, updateUser);

export default router;
