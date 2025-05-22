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
// employeeRepository employee=new employeeRepository()
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
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
    createEmployee(email, name, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAddress = new address_entity_1.Address();
            newAddress.address = address.address;
            newAddress.pincode = address.pincode;
            const newEmployee = new employee_entity_1.default();
            newEmployee.email = email;
            newEmployee.name = name;
            newEmployee.age = age;
            newEmployee.address = newAddress;
            return this.employeeRepository.create(newEmployee);
        });
    }
    updateEmployee(id, email, name, address, age) {
        return __awaiter(this, void 0, void 0, function* () {
            const exitstingEmployee = yield this.employeeRepository.findOneById(id);
            if (exitstingEmployee) {
                const employee = new employee_entity_1.default();
                employee.name = name;
                employee.email = email;
                employee.address = address;
                employee.age = age;
                yield this.employeeRepository.update(id, employee);
            }
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
//# sourceMappingURL=employee.services.js.map