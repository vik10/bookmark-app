import express, { Express } from "express";
import dotenv from "dotenv";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import authRoutes from "./routes/auth.routes.js";
import pinoHttp from "pino-http";
import { errorMiddleware } from "./middleware/index.js";
import { logger, sessionMiddleware } from "./config";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Request logger
app.use(
  pinoHttp({
    logger,
  }),
);

// Parse JSON request bodies
app.use(express.json());

//CORS
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// create sessions before routes
app.use(sessionMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

// Error middleware should come in the end of all routes
app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
