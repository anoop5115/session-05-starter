import EmployeeController from "../controllers/employee.controller";
import datasource from "../db/data-source";
import { Department } from "../entities/department.enity";

import Employee from "../entities/employee.entity";
import DepartmentRepository from "../repositories/department.repository";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import express from "express";

const employeeRouter = express.Router();
const departmentRepository = new DepartmentRepository(
  datasource.getRepository(Department)
);
const employeeRepository = new EmployeeRepository(
  datasource.getRepository(Employee)
);
export const employeeService = new EmployeeService(employeeRepository,departmentRepository);
const employeeController = new EmployeeController(
  employeeService,
  employeeRouter
);
export default employeeRouter;
