import { Request, Response } from "express";
import { logger, pool } from "../config";

export const testDatabaseConnection = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      status: "ok",
      message: "Database connected",
      timestamp: result.rows[0],
    });
  } catch (error) {
    logger.error({ error }, "Database connection failed");
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: (error as Error).message,
    });
  }
};
