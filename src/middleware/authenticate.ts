import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createResponse } from "../utils";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return createResponse(res, 401, 'Token missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      iat: number;
      exp: number;
    };

    req.user = decoded.id;

    next();
  } catch (error) {
    console.info(`Token verification failed: ${error}`);

    return createResponse(res, 401, 'Token verification failed');
  }
};