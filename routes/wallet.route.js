import { Router } from "express";
import {
  createWallet,
  deleteWallet,
  deposit,
  getAllWallets,
  updateWallet,
  withdraw,
} from "../controllers/wallet.controller.js";

const router = Router();

router.get("/", getAllWallets);
router.post("/", createWallet);
router.delete("/:id", deleteWallet);
router.put("/:id", updateWallet);
router.put("/:id/deposit", deposit);
router.put("/:id/withdraw", withdraw);

export default router;
