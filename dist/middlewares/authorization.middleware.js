"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const httpException_1 = require("../exception/httpException");
const authorizationMiddleware = (roles) => (req, res, next) => {
    var _a;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (!roles.includes(role)) {
        throw new httpException_1.HttpException(403, "user has no privilage");
    }
    next();
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorization.middleware.js.map