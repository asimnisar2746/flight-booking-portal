import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

import authRoutes from "../src/routes/auth.routes.js";
app.use("/api/auth", authRoutes);
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
