import { NextFunction, Request, Response } from "express";
import { logger } from "../config";
import { isCustomError } from "../utils";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error({ err: error }, "Unhandled application error");

  if (isCustomError(error)) {
    res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
