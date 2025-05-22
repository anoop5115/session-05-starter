import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstarctEntity } from "./abstart.entity";
import { Address } from "./address.entity.";

@Entity()
class Employee extends AbstarctEntity {
  @Column({ unique: true })
  email: string;
  @Column()
  name: string;

  @Column()
  age: number;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  address: Address;

  @Column()
  password: String;
}

export default Employee;
