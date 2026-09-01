import { Request, Response } from "express";
import { logger, pool } from "../config";
import { createBookmark, handleGetBookmarksByUserId } from "../services";

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

export const bookmarkCreation = async (req: Request, res: Response) => {
  const result = await createBookmark({
    ...req.body,
    userId: req.session.userId,
  });
  res.status(201).json(result);
};

export const getBookmarksByUserId = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  const result = await handleGetBookmarksByUserId(Number(userId), req.query);
  res.status(200).json(result);
};
