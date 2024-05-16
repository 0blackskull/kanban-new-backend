import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.info(`${req.method} ${req.url}`);

  next();
};