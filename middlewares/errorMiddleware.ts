import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/httpException";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (error instanceof HttpException) {
      const status: number = error.status || 500;
      const message: string = error.message || "something went wrong";
      let repbody = { message: message };
      res.status(status).json(repbody);
    } else {
      console.error(error.stack);
      res.status(500).send({ error: error.message });
    }
  } catch (err) {
    next(err);
  }
};
