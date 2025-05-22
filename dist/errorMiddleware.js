"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const httpException_1 = require("./exception/httpException");
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof httpException_1.HttpException) {
            const status = error.status || 500;
            const message = error.message || "something went wrong";
            let repbody = { message: message };
            res.status(status).json(repbody);
        }
        else {
            console.error(error.stack);
            res.status(500).send({ error: error.message });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map