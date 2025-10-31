import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

// ✅ Robust CORS setup
const allowedOrigins = [
  "http://localhost:5173",               // Local development (Vite)
  "https://password-reset98.netlify.app" // Live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle OPTIONS requests globally (important for CORS preflights)
app.options("*", cors());

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Connect DB
connectDB();

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
