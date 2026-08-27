import express, { Express } from "express";
import dotenv from "dotenv";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import authRoutes from "./routes/auth.routes.js";
import pinoHttp from "pino-http";
import logger from "./config/logger";
import { errorMiddleware } from "./middleware/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  pinoHttp({
    logger,
  }),
);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

// Error middleware should come in the end of all routes
app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
