import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { seedDefaultAdmin } from "./controllers/adminController.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database & Seed Admin
connectDB().then(() => {
  seedDefaultAdmin();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Fair Future API",
  });
});

// Mount Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  🚀 Server running on http://localhost:${PORT}`);
  console.log(`  📁 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`==================================================`);
});
