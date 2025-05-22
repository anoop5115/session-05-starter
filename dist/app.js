"use strict";
// import express, { Request, Response } from "express";
// import employeeRouter from "./employee_router";
// import loggerMiddleware from "./loggerMiddleware";
// import { processTimeMiddleware } from "./processTimeMiddleware";
// const {Client}=require('pg');
// const server = express();
// server.use(express.json());
// server.use(loggerMiddleware);
// server.use(processTimeMiddleware);
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
// server.get("/", (req: Request, res: Response) => {
//   res.status(200).send("Hello world");
// });
// server.use("/employees", employeeRouter);
// server.listen(3004, () => {
//   console.log("server listening to 3000");
// });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
// import employeeRouter from "./employee_router";
const loggerMiddleware_1 = __importDefault(require("./loggerMiddleware"));
const employee_route_1 = __importDefault(require("./routes/employee.route"));
const data_source_1 = __importDefault(require("./db/data-source"));
const errorMiddleware_1 = require("./errorMiddleware");
// import datasource from "./data-source";
const { Client } = require("pg");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use(loggerMiddleware_1.default);
server.use("/employee", employee_route_1.default);
server.get("/", (req, res) => {
    console.log(req.url);
    res.status(200).send("Hello world typescript");
});
server.use(errorMiddleware_1.errorMiddleware);
// Database connection configuration
// const dbConfig = {
//   user: "postgres",
//   password: "postgres",
//   host: "localhost",
//   port: "5434",
//   database: "training",
// };
// const client = new Client(dbConfig);
// client
//   .connect()
//   .then(() => {
//     client.query("SELECT * FROM employee", (err, result) => {
//       if (!err) {
//         console.log("Query result:", result.rows);
//       }
//       client.end();
//     });
//   })
// .catch((err) => {});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.default.initialize();
        console.log("connected");
    }
    catch (_a) {
        console.error("failed to conned db");
        process.exit(1);
    }
    server.listen(3004, () => {
        console.log("server listening to 3000");
    });
}))();
//# sourceMappingURL=app.js.map