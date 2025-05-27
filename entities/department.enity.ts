import { Column, Entity, JoinColumn, JoinTable, OneToMany } from "typeorm";
import { AbstarctEntity } from "./abstart.entity";
import Employee from "./employee.entity";

@Entity()
export class Department extends AbstarctEntity{
    @Column()
    deptname:string;

    @OneToMany(()=>Employee,(employee)=>employee.department,{
        onDelete:"CASCADE"
    })
    @JoinColumn()
    employee:Employee

    

}