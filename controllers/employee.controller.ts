import EmployeeService from "../services/employee.service";
import { Request, Response } from "express";
import { Router, NextFunction } from "express";
import { isEmail } from "../validators/emailValidator";
import { HttpException } from "../exception/httpException";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";

class EmployeeController {
  constructor(private employeeService: EmployeeService, router: Router) {
    router.post(
      "/",
      authorizationMiddleware([EmployeeRole.DEVELOPER, EmployeeRole.HR]),
      this.createEmployee.bind(this)
    );
    router.get("/", this.getAllEmployees.bind(this));
    router.get("/:id", this.getEmployeeById.bind(this));
    router.put("/:id", this.updateEmployee.bind(this));
    router.delete("/:id", this.deleteEmployee.bind(this));
  }

  async getAllEmployees(req: Request, res: Response) {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  }
  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const employee = await this.employeeService.getEmployeeById(
        Number(req.params.id)
      );

      if (!employee) {
        throw new Error("not found");
      }
      res.status(200).send(employee);
    } catch (e) {
      console.log("error");
      next(e);
      //   res.status(400).send("id not found");
    }
  }
  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.address,
        createEmployeeDto.password,
        createEmployeeDto.role,
        createEmployeeDto.department
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
  }
  async deleteEmployee(req: Request, res: Response) {
    await this.employeeService.deleteEmployee(Number(req.params.id));
    res.status(201).send("deleted");
  }
  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      await this.employeeService.updateEmployee(
        Number(req.params.id),
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.address,
        createEmployeeDto.password,
        createEmployeeDto.department
      );
      res.status(200).send("updated");
    } catch (e) {
      next(e);
    }
  }
}
export default EmployeeController;
