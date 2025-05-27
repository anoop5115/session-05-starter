import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}

  async create(employee: Employee): Promise<Employee> {
    return this.repository.save(employee);
  }

  async findMany(): Promise<Employee[]> {
    return this.repository.find({
      relations: {
        address: true,
        department: true,
      },
    });
  }
  async findOneById(id: number): Promise<Employee> {
    return this.repository.findOne({
      where: { id },
      relations: {
        address: true,
        department: true,
      },
    });
  }
  async findByEmail(email: string): Promise<Employee> {
    return this.repository.findOneBy({ email });
  }

  async update(id: number, employee: Employee): Promise<void> {
    console.log({ id, ...employee });
    await this.repository.save({ id, ...employee });
  }
  async delete(id: number): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
export default EmployeeRepository;
