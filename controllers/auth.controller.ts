import { Router, Request, Response, NextFunction } from "express";

import { AuthService } from "../services/auth.service";
import { HttpException } from "../exception/httpException";

export class AuthController {
  constructor(private authService: AuthService, private route: Router) {
    route.post("/login", this.login.bind(this));
  }
  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HttpException(400, "email and password are required");
      }

      const data = await this.authService.login(email, password);
      resp.status(200).send(data);
    } catch (e) {
      next(e);
    }
  }
}
