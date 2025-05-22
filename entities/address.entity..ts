import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AbstarctEntity } from "./abstart.entity";
import Employee from "./employee.entity";
@Entity()
export class Address extends AbstarctEntity {
  @Column()
  address: String;

  @Column({ unique: true })
  pincode: string;

  @OneToOne(() => Employee)
  employee: Employee;
}
