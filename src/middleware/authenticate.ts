import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createResponse } from "../utils";

export const authenticate = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return createResponse(res, 401, "Token missing");
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

    return createResponse(res, 401, "Token verification failed");
  }
};

// export const accessHeaders = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );

//   next();
// };
