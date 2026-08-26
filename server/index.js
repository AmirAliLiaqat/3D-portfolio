import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { runAllSeeds } from "./seed/index.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio & Company Backend API is running smoothly",
    timestamp: new Date(),
  });
});

// Middleware to ensure DB connection per API request
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connection Middleware Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Database Connection Error: " + err.message,
    });
  }
});

// API Routes
app.use("/api", apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

// Initialize DB and Auto-Seed BEFORE opening port listener
const startServer = async () => {
  try {
    await connectDB();
    await runAllSeeds();
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    }
  } catch (err) {
    console.error("Failed to start server:", err.message);
  }
};

startServer();

export default app;
