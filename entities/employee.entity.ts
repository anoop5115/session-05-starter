import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AbstarctEntity } from "./abstart.entity";
import { Address } from "./address.entity.";
import { Department } from "./department.enity";
export enum EmployeeRole {
  UI = "UI",
  UX = "UX",
  DEVELOPER = "DEVELOPER",
  HR = "HR",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PROBATION = "PROBATION",
}
@Entity()
class Employee extends AbstarctEntity {
  @Column({ unique: true })
  email: string;
  @Column()
  name: string;

  @Column()
  employeeId: string;

  @Column()
  dateOfJoining: Date;

  @Column()
  experience: number;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  @Column()
  age: number;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
  })
  address: Address;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: EmployeeRole,
    default: EmployeeRole.DEVELOPER,
  })
  role: EmployeeRole;

  @ManyToOne(() => Department, (department) => department.employee)
  department: Department;
}

export default Employee;
