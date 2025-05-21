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
import express from "express";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import datasource from "./data-source";
const { Client } = require("pg");

const server = express();
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee", employeeRouter);

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});

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
    console.log("connected");
  } catch {
    console.error("failed to conned db");
    process.exit(1);
  }
  server.listen(3005, () => {
    console.log("server listening to 3000");
  });
})();
