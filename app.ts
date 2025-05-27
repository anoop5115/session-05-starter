// import express, { Request, Response } from "express";
// import employeeRouter from "./employee_router";
// import loggerMiddleware from "./loggerMiddleware";
// import { processTimeMiddleware } from "./processTimeMiddleware";
// const {Client}=require('pg');
// const server = express();
// server.use(express.json());
// server.use(loggerMiddleware);
// server.use(processTimeMiddleware);

// server.get("/", (req: Request, res: Response) => {
//   res.status(200).send("Hello world");
// });

// server.use("/employees", employeeRouter);

// server.listen(3004, () => {
//   console.log("server listening to 3000");
// });
import "reflect-metadata";

import express from "express";
// import employeeRouter from "./employee_router";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import employeeRouter from "./routes/employee.route";
import datasource from "./db/data-source";

import { authRouter } from "./routes/auth.route";

import { LoggerService } from "./services/logging.service";
import departmentRouter from "./routes/department.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorMiddleware } from "./middlewares/errorMiddleware";
// import datasource from "./data-source";
const { Client } = require("pg");
const logger = LoggerService.getInstance("app()");
const server = express();

server.use(express.json());
server.use(loggerMiddleware);
server.use("/auth", authRouter);
server.use("/employee", authMiddleware, employeeRouter);
server.use("/department", departmentRouter);
server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});
server.use(errorMiddleware);
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

(async () => {
  try {
    await datasource.initialize();
    logger.info("connected");
  } catch {
    logger.error("failed to conned db");
    process.exit(1);
  }
  server.listen(3006, () => {
    logger.info("server listening to 3000");
  });
})();
