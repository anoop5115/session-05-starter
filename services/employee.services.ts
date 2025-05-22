import { CreateAddressDto } from "../dto/create-address.dto";
import { Address } from "../entities/address.entity.";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";

// employeeRepository employee=new employeeRepository()

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}
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
    address: CreateAddressDto
  ): Promise<Employee> {
    const newAddress = new Address();
    newAddress.address = address.address;
    newAddress.pincode = address.pincode;

    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.age = age;
    newEmployee.address = newAddress;
    return this.employeeRepository.create(newEmployee);
  }
  async updateEmployee(
    id: number,
    email: string,
    name: string,
    address: Address,
    age: number
  ) {
    const exitstingEmployee = await this.employeeRepository.findOneById(id);

    if (exitstingEmployee) {
      const employee = new Employee();
      employee.name = name;
      employee.email = email;
      employee.address = address;
      employee.age = age;
      await this.employeeRepository.update(id, employee);
    }
  }
  async deleteEmployee(id: number) {
    const exitstingEmployee = await this.employeeRepository.findOneById(id);
    if (EmployeeRepository) {
      this.employeeRepository.delete(id);
    }
  }
}
export default EmployeeService;
