import express from "express";
import { loginAdmin, getMe } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { validateAdminLogin } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/login", validateAdminLogin, loginAdmin);
router.get("/me", protectAdmin, getMe);

export default router;
