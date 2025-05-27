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
class DepartmentController {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.post("/", this.createDepartment.bind(this));
        router.put("/:id", this.updateDepartment.bind(this));
        router.delete("/:id", this.deleteDepartment.bind(this));
    }
    getAllDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const departments = yield this.departmentService.getAllDepartments();
            res.status(200).send(departments);
        });
    }
    getDepartmentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield this.departmentService.getDepartmentById(Number(req.params.id));
                if (!department) {
                    throw new Error("not found");
                }
                res.status(200).send(department);
            }
            catch (e) {
                console.log("error");
                next(e);
            }
        });
    }
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deptname = req.body.deptname;
                const department = yield this.departmentService.createDepartment(deptname);
                res.status(201).send(department);
            }
            catch (e) {
                next(e);
            }
        });
    }
    deleteDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.departmentService.deleteDepartment(Number(req.params.id));
            res.status(200).send("deleted");
        });
    }
    updateDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deptname = req.body.deptname;
            yield this.departmentService.updateDepartment(Number(req.params.id), deptname);
            res.status(200).send("updated");
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map