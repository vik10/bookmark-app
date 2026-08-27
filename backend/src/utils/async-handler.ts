import { RequestHandler, Response, Request, NextFunction } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const asyncHandler = (controller: AsyncController): RequestHandler => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};
