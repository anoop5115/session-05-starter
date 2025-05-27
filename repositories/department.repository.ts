import { Repository } from "typeorm";
import { Department } from "../entities/department.enity";

class DepartmentRepository {
  constructor(private repository: Repository<Department>) {}

  async createDept(department: Department): Promise<Department> {
    return this.repository.save(department);
  }
  async findMany(): Promise<Department[]> {
    return this.repository.find();
  }

  async findOneById(id: number): Promise<Department> {
    return this.repository.findOne({
      where: { id },
      relations: {
        employee: true,
      },
    });
  }
  async update(id: number, department: Department): Promise<void> {
    console.log({ id, ...department });
    await this.repository.save({ id, ...department });
  }
  async delete(id: number): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
export default DepartmentRepository;
