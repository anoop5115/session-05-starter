import { NextFunction, Request, Response } from "express";


import jwt, { } from "jsonwebtoken";
import { JwtPayload } from "../dto/jwt-payload";
import { JWT_SECRET } from "../utils/constants";
import { HttpException } from "../exception/httpException";

const getToken = (req: Request): string => {
  const token: string = req.headers.authorization;
  if (!token) throw new HttpException(401, "not authorized");

  const tokenSplits = token.split(" ");
  if (tokenSplits.length != 2) throw new HttpException(401, "invalid token");

  return tokenSplits[1];
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);
  if (!token) throw new HttpException(401, "Not authorized");
  console.log(token);

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user=payload
  } catch {
    throw new HttpException(401, "expire token or invalid");
  }
  next();
};
