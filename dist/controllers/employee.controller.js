"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = require("../exception/httpException");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_employee_dto_1 = require("../dto/create-employee.dto");
const authorization_middleware_1 = require("../middlewares/authorization.middleware");
const employee_entity_1 = require("../entities/employee.entity");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        router.post("/", (0, authorization_middleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.DEVELOPER, employee_entity_1.EmployeeRole.HR]), this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", this.updateEmployee.bind(this));
        router.delete("/:id", this.deleteEmployee.bind(this));
    }
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        });
    }
    getEmployeeById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.employeeService.getEmployeeById(Number(req.params.id));
                if (!employee) {
                    throw new Error("not found");
                }
                res.status(200).send(employee);
            }
            catch (e) {
                console.log("error");
                next(e);
                //   res.status(400).send("id not found");
            }
        });
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //   try {
            //     if (!isEmail(email)) {
            //       throw new HttpException(412, "@ not present");
            //     }
            //     const employee = await this.employeeService.createEmployee(
            //       name,
            //       email,
            //       age,
            //       address
            //     );
            //     res.status(201).send(employee);
            //   } catch (e) {
            //     next(e);
            //   }
            try {
                const email = req.body.email;
                const name = req.body.name;
                const age = req.body.age;
                const address = req.body.address;
                const password = req.body.password;
                const role = req.body.role;
                // const dep_id=req.body.dep_id;
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.HttpException(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, createEmployeeDto.address, createEmployeeDto.password, createEmployeeDto.role, createEmployeeDto.department);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.employeeService.deleteEmployee(Number(req.params.id));
            res.status(201).send("deleted");
        });
    }
    updateEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.HttpException(400, JSON.stringify(errors));
                }
                yield this.employeeService.updateEmployee(Number(req.params.id), createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, createEmployeeDto.address, createEmployeeDto.password, createEmployeeDto.department);
                res.status(200).send("updated");
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controller.js.map