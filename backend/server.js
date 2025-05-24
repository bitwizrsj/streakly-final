
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";  // Auth routes
import taskRoutes from "./routes/task.route.js";  // Task routes

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5174", // Dynamically allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],                // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"],        // Allow headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  }
})();

// Routes
app.use("/api/auth", authRoutes);  // Authentication routes
app.use("/api/tasks", taskRoutes); // Task routes

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
