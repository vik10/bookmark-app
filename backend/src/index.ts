import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import dbRoutes from "./routes/dbRoutes.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
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
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Bookmark API is running" });
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api", dbRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
