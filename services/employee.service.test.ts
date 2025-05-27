// import { EmployeeRepository } from "../../repositories/employee.repository";
import Employee from "../entities/employee.entity";
import departmentRepository from "../repositories/department.repository";
import DepartmentRepository from "../repositories/department.repository";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import { mock, MockProxy } from "jest-mock-extended";
import { when } from "jest-when";
describe("EmployeeService", () => {
  let employeeRepository: MockProxy<EmployeeRepository>;
  let employeeService: EmployeeService;
  let departmentRepository;
  describe("getEmployeeById", () => {
    beforeEach(() => {
      employeeRepository = mock<EmployeeRepository>();
      departmentRepository = mock<DepartmentRepository>();
      employeeService = new EmployeeService(
        employeeRepository,
        departmentRepository
      );
    });

    describe("get employee by id", () => {
      it("should return user with proper id", async () => {
        const mockEmployee = { id: 123, name: "anoop" } as Employee;
        when(employeeRepository.findOneById)
          .calledWith(1)
          .mockReturnValue(mockEmployee);
        const result = await employeeService.getEmployeeById(1);
        expect(result).toStrictEqual(mockEmployee);
      });
    });
  });
});
