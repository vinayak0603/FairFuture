import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  addAdminNote,
  deleteApplication,
  getAnalytics,
} from "../controllers/applicationController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { validateApplication } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Public submission
router.post("/", validateApplication, createApplication);

// Protected Admin routes
router.get("/analytics/overview", protectAdmin, getAnalytics);
router.get("/", protectAdmin, getApplications);
router.get("/:id", protectAdmin, getApplicationById);
router.patch("/:id/status", protectAdmin, updateApplicationStatus);
router.post("/:id/notes", protectAdmin, addAdminNote);
router.delete("/:id", protectAdmin, deleteApplication);

export default router;
