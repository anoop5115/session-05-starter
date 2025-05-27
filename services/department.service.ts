import { Department } from "../entities/department.enity";
import DepartmentRepository from "../repositories/department.repository";

class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  async getAllDepartments(): Promise<Department[]> {
    return this.departmentRepository.findMany();
  }

  async getDepartmentById(id: number): Promise<Department> {
    return this.departmentRepository.findOneById(id);
  }

  async createDepartment(deptname: string): Promise<Department> {
    
    const newDepartment = new Department();
    newDepartment.deptname = deptname;
    return this.departmentRepository.createDept(newDepartment);
  }

  async updateDepartment(id: number, deptname: string) {
    const existingDepartment = await this.departmentRepository.findOneById(id);
    if (existingDepartment) {
      existingDepartment.deptname = deptname;
      await this.departmentRepository.update(id, existingDepartment);
    }
  }

  async deleteDepartment(id: number) {
    const existingDepartment = await this.departmentRepository.findOneById(id);
    if (existingDepartment) await this.departmentRepository.delete(id);
  }
}
export default DepartmentService;
