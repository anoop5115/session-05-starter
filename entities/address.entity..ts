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

  @Column()
  line2: string;

  @Column()
  houseNo: string;

  @Column({ unique: true })
  pincode: string;

  @OneToOne(() => Employee, (employee) => employee.address, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  employee: Employee;
}
