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

// Allowed Origins for CORS
const allowedOrigins = [
  "https://fairfuture-gozoop.vercel.app",
  "https://fair-future-orcin.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5000",
];

// CORS Middleware Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
