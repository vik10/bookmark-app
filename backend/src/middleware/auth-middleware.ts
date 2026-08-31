import { NextFunction, Request, Response } from "express";
import { createAppError } from "../utils";

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.session?.userId) {
    throw createAppError("Unauthorized", 401);
  }
  next();
};
