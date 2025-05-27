import { NextFunction, Request, Response, Router } from "express";
import DepartmentService from "../services/department.service";
import { plainToClass, plainToInstance } from "class-transformer";
import { CreateDepartmentDto } from "../dto/department.dto";
import { validate } from "class-validator";
import { HttpException } from "../exception/httpException";

class DepartmentController {
  constructor(private departmentService: DepartmentService, router: Router) {
    router.get("/", this.getAllDepartments.bind(this));
    router.get("/:id", this.getDepartmentById.bind(this));
    router.post("/", this.createDepartment.bind(this));
    router.put("/:id", this.updateDepartment.bind(this));
    router.delete("/:id", this.deleteDepartment.bind(this));
  }

  async getAllDepartments(req: Request, res: Response) {
    const departments = await this.departmentService.getAllDepartments();
    res.status(200).send(departments);
  }

  async getDepartmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await this.departmentService.getDepartmentById(
        Number(req.params.id)
      );

      if (!department) {
        throw new Error("not found");
      }
      res.status(200).send(department);
    } catch (e) {
      console.log("error");
      next(e);
    }
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }

      const department = await this.departmentService.createDepartment(
        createDepartmentDto.name
      );
      res.status(201).send(department);
    } catch (e) {
      next(e);
    }
  }
  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    await this.departmentService.deleteDepartment(Number(req.params.id));
    res.status(200).send("deleted");
  }
  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    const deptname = req.body.deptname;
    await this.departmentService.updateDepartment(
      Number(req.params.id),
      deptname
    );
    res.status(200).send("updated");
  }
}
export default DepartmentController;
