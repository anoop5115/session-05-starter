import express from "express";
import Employee from "./employee.entity";
import datasource from "./data-source";
import { Entity } from "typeorm";
const employeeRouter = express.Router();
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

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);

  const employee = await employeeRepository.findOneBy({ id: empId });
  if (!employee) {
    res.status(404).send("Employee not found");
    return;
  }
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  console.log(req.body);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  newEmployee.createdAt = new Date();
  newEmployee.updatedAt = new Date();
  newEmployee.id = ++count;

  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);

  const employee = await employeeRepository.insert(newEmployee);

  res.status(201).send(newEmployee);
});

//To delete employee using a id
employeeRouter.delete("/:id", async (req, res) => {
  // const employeeIdxToDelete = employees.findIndex(
  //   (emp) => emp.id === Number(req.params["id"])
  // );
  // employees.splice(employeeIdxToDelete, 1);
  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);

  const employee = await employeeRepository.delete(empId);
  res.status(200).send("deleted");
});

employeeRouter.patch("/:id", async (req, res) => {
  //   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
  //   employee.email = req.body.email;
  //   employee.name = req.body.name;
  //   employee.updatedAt = new Date();
  //   console.log("update employees");

  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);

  const employee = await employeeRepository.update(
    { id: empId },
    { name: req.body.name }
  );
  res.status(200).send("employee updatd");
});

employeeRouter.put("/", async (req, res) => {
  //   const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
  //   employee.email = req.body.email;
  //   employee.name = req.body.name;
  //   employee.updatedAt = new Date();
  //   console.log("update employees");

  const empId = Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);

  const employee = await employeeRepository.findOneBy({
    email: req.body.email,
  });

  // employee.createdAt = req.body.createdAt;
  // employee.id = req.body.id;
  employee.name = req.body.name;
  // employee.updatedAt = req.body.updatedAt;

  await employeeRepository.save(employee);
  res.status(200).send("updated");
});

export default employeeRouter;
