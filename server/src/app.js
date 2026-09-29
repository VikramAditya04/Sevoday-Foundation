import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "API is running" }),
);
app.get("/", (req, res) =>
  res.json({ success: true, message: "Sevoday API Running Successfully" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
