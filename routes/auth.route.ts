import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

import { employeeService } from "./employee.route";

export const authRouter = express.Router();

const authService = new AuthService(employeeService);
new AuthController(authService, authRouter);
