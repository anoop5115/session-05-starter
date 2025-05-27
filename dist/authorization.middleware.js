"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const employee_entity_1 = require("./entities/employee.entity");
const httpException_1 = require("./exception/httpException");
const authorizationMiddleware = (req, res, next) => {
    var _a;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (role !== employee_entity_1.EmployeeRole.HR) {
        throw new httpException_1.HttpException(403, "user has no privilage");
    }
    next();
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization.middleware.js.map