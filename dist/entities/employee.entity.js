"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.EmployeeRole = void 0;
const typeorm_1 = require("typeorm");
const abstart_entity_1 = require("./abstart.entity");
const address_entity_1 = require("./address.entity.");
const department_enity_1 = require("./department.enity");
var EmployeeRole;
(function (EmployeeRole) {
    EmployeeRole["UI"] = "UI";
    EmployeeRole["UX"] = "UX";
    EmployeeRole["DEVELOPER"] = "DEVELOPER";
    EmployeeRole["HR"] = "HR";
})(EmployeeRole || (exports.EmployeeRole = EmployeeRole = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
    Status["PROBATION"] = "PROBATION";
})(Status || (exports.Status = Status = {}));
let Employee = class Employee extends abstart_entity_1.AbstarctEntity {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Employee.prototype, "dateOfJoining", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Employee.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Status,
        default: Status.ACTIVE,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Employee.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.Address, (address) => address.employee, {
        cascade: true,
    }),
    __metadata("design:type", address_entity_1.Address)
], Employee.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: EmployeeRole,
        default: EmployeeRole.DEVELOPER,
    }),
    __metadata("design:type", String)
], Employee.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_enity_1.Department, (department) => department.employee),
    __metadata("design:type", department_enity_1.Department)
], Employee.prototype, "department", void 0);
Employee = __decorate([
    (0, typeorm_1.Entity)()
], Employee);
exports.default = Employee;
//# sourceMappingURL=employee.entity.js.map