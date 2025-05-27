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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_entity_1 = require("../entities/address.entity.");
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const employee_repository_1 = __importDefault(require("../repositories/employee.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logging_service_1 = require("./logging.service");
// employeeRepository employee=new employeeRepository()
const logger = logging_service_1.LoggerService.getInstance("app()");
class EmployeeService {
    constructor(employeeRepository, departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findMany();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findOneById(id);
        });
    }
    createEmployee(email, name, age, address, password, role, department_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAddress = new address_entity_1.Address();
            newAddress.address = address.address;
            newAddress.pincode = address.pincode;
            const newDepartment = yield this.departmentRepository.findOneById(department_id);
            const newEmployee = new employee_entity_1.default();
            newEmployee.email = email;
            newEmployee.name = name;
            newEmployee.age = age;
            newEmployee.address = newAddress;
            newEmployee.role = role;
            newEmployee.department = newDepartment;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            return this.employeeRepository.create(newEmployee);
        });
    }
    updateEmployee(id, email, name, age, address, password, dept_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exitstingEmployee = yield this.employeeRepository.findOneById(id);
            const existingDepartment = yield this.departmentRepository.findOneById(dept_id);
            if (exitstingEmployee) {
                exitstingEmployee.email = email;
                exitstingEmployee.name = name;
                exitstingEmployee.age = age;
                exitstingEmployee.address.address = address.address;
                exitstingEmployee.address.pincode = address.pincode;
                exitstingEmployee.department = existingDepartment;
                yield this.employeeRepository.update(id, exitstingEmployee);
            }
        });
    }
    getempbymail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findByEmail(email);
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exitstingEmployee = yield this.employeeRepository.findOneById(id);
            if (employee_repository_1.default) {
                this.employeeRepository.delete(id);
            }
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map