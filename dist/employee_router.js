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
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("./employee.entity"));
const data_source_1 = __importDefault(require("./data-source"));
const employeeRouter = express_1.default.Router();
let count = 2;
// let employees: Employee[] = [
//   {
//     id: 1,
//     email: "employee1@gmail.com",
//     name: "Employee1",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     email: "employee2@gmail.com",
//     name: "Employee2",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employees = yield employeeRepository.find();
    res.status(200).send(employees);
}));
employeeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.findOneBy({ id: empId });
    if (!employee) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).send(employee);
}));
employeeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const newEmployee = new employee_entity_1.default();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    newEmployee.createdAt = new Date();
    newEmployee.updatedAt = new Date();
    newEmployee.id = ++count;
    const empId = Number(req.params["id"]);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.insert(newEmployee);
    res.status(201).send(newEmployee);
}));
//To delete employee using a id
employeeRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const employeeIdxToDelete = employees.findIndex(
    //   (emp) => emp.id === Number(req.params["id"])
    // );
    // employees.splice(employeeIdxToDelete, 1);
    const empId = Number(req.params["id"]);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.delete(empId);
    res.status(200).send("deleted");
}));
employeeRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
    //   employee.email = req.body.email;
    //   employee.name = req.body.name;
    //   employee.updatedAt = new Date();
    //   console.log("update employees");
    const empId = Number(req.params["id"]);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.update({ id: empId }, { name: req.body.name });
    res.status(200).send("employee updatd");
}));
employeeRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
    //   employee.email = req.body.email;
    //   employee.name = req.body.name;
    //   employee.updatedAt = new Date();
    //   console.log("update employees");
    const empId = Number(req.params["id"]);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.findOneBy({
        email: req.body.email,
    });
    // employee.createdAt = req.body.createdAt;
    // employee.id = req.body.id;
    employee.name = req.body.name;
    // employee.updatedAt = req.body.updatedAt;
    yield employeeRepository.save(employee);
    res.status(200).send("updated");
}));
exports.default = employeeRouter;
//# sourceMappingURL=employee_router.js.map