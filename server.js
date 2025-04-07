import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import connectDB from './utils/database.js';
import { errorMiddleware } from "./middleware/error.middleware.js";
import bidRouter from "./routes/bid.js";
import itemRouter from "./routes/item.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 Serve files from /uploads as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRouter);
app.use('/api/bid', bidRouter);

app.use(errorMiddleware);
// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
