import express from "express";
import DepartmentRepository from "../repositories/department.repository";
import datasource from "../db/data-source";
import { Department } from "../entities/department.enity";
import EmployeeService from "../services/employee.service";
import DepartmentService from "../services/department.service";
import DepartmentController from "../controllers/department.controller";
const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepository(
  datasource.getRepository(Department)
);

export const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(
  departmentService,
  departmentRouter
);
export default departmentRouter;
