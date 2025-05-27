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
const department_enity_1 = require("../entities/department.enity");
class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findMany();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentRepository.findOneById(id);
        });
    }
    createDepartment(deptname) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDepartment = new department_enity_1.Department();
            newDepartment.deptname = deptname;
            return this.departmentRepository.createDept(newDepartment);
        });
    }
    updateDepartment(id, deptname) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findOneById(id);
            if (existingDepartment) {
                existingDepartment.deptname = deptname;
                yield this.departmentRepository.update(id, existingDepartment);
            }
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingDepartment = yield this.departmentRepository.findOneById(id);
            if (existingDepartment)
                yield this.departmentRepository.delete(id);
        });
    }
}
exports.default = DepartmentService;
//# sourceMappingURL=department.service.js.map