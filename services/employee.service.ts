import { CreateAddressDto } from "../dto/create-address.dto";
import { Address } from "../entities/address.entity.";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import { LoggerService } from "./logging.service";
import { Department } from "../entities/department.enity";
import DepartmentRepository from "../repositories/department.repository";
// employeeRepository employee=new employeeRepository()
const logger = LoggerService.getInstance("app()");
class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentRepository: DepartmentRepository
  ) {}

  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeRepository.findMany();
  }
  async getEmployeeById(id: number): Promise<Employee> {
    return this.employeeRepository.findOneById(id);
  }
  async createEmployee(
    email: string,
    name: string,
    age: number,
    address: CreateAddressDto,
    password: string,
    role: EmployeeRole,
    department_id: number
  ): Promise<Employee> {
    const newAddress = new Address();
    newAddress.address = address.address;
    newAddress.pincode = address.pincode;
    const newDepartment = await this.departmentRepository.findOneById(
      department_id
    );
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.age = age;
    newEmployee.address = newAddress;
    newEmployee.role = role;
    newEmployee.department = newDepartment;
    newEmployee.password = await bcrypt.hash(password, 10);
    return this.employeeRepository.create(newEmployee);
  }
  async updateEmployee(
    id: number,
    email: string,
    name: string,
    age: number,
    address: CreateAddressDto,

    password: string,
    dept_id: number
  ) {
    const exitstingEmployee = await this.employeeRepository.findOneById(id);

    const existingDepartment = await this.departmentRepository.findOneById(
      dept_id
    );

    if (exitstingEmployee) {
      exitstingEmployee.email = email;
      exitstingEmployee.name = name;
      exitstingEmployee.age = age;
      exitstingEmployee.address.address = address.address;
      exitstingEmployee.address.pincode = address.pincode;

      exitstingEmployee.department = existingDepartment;

      await this.employeeRepository.update(id, exitstingEmployee);
    }
  }
  async getempbymail(email: string) {
    return this.employeeRepository.findByEmail(email);
  }
  async deleteEmployee(id: number) {
    const exitstingEmployee = await this.employeeRepository.findOneById(id);
    if (EmployeeRepository) {
      this.employeeRepository.delete(id);
    }
  }
}
export default EmployeeService;
