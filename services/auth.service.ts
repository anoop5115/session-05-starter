import { JwtPayload } from "../dto/jwt-payload";
import { HttpException } from "../exception/httpException";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import EmployeeService from "./employee.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AuthService {
  constructor(private employeeService: EmployeeService) {}
  async login(email: string, password: string) {
    const employee = await this.employeeService.getempbymail(email);
    console.log(employee);
    if (!employee) {
      throw new HttpException(400, "nosuch user");
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    const payload: JwtPayload = {
      id: employee.id,
      email: employee.email,
      role: employee.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_VALIDITY });
    return {
      tokenType: "bearer",
      accessToken: token,
    };
  }
}
