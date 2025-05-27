import { NextFunction, Request, Response } from "express";

import Employee, { EmployeeRole } from "../entities/employee.entity";
import { HttpException } from "../exception/httpException";

export const authorizationMiddleware =
  (roles: EmployeeRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!roles.includes(role)) {
      throw new HttpException(403, "user has no privilage");
    }
    next();
  };
