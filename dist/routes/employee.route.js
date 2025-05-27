"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
const employee_controller_1 = __importDefault(require("../controllers/employee.controller"));
const data_source_1 = __importDefault(require("../db/data-source"));
const department_enity_1 = require("../entities/department.enity");
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const department_repository_1 = __importDefault(require("../repositories/department.repository"));
const employee_repository_1 = __importDefault(require("../repositories/employee.repository"));
const employee_service_1 = __importDefault(require("../services/employee.service"));
const express_1 = __importDefault(require("express"));
const employeeRouter = express_1.default.Router();
const departmentRepository = new department_repository_1.default(data_source_1.default.getRepository(department_enity_1.Department));
const employeeRepository = new employee_repository_1.default(data_source_1.default.getRepository(employee_entity_1.default));
exports.employeeService = new employee_service_1.default(employeeRepository, departmentRepository);
const employeeController = new employee_controller_1.default(exports.employeeService, employeeRouter);
exports.default = employeeRouter;
//# sourceMappingURL=employee.route.js.map