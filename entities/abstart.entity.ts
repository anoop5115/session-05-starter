import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,

  DeleteDateColumn,
} from "typeorm";

export class AbstarctEntity {
  @PrimaryGeneratedColumn()
 
  id: number;

  @CreateDateColumn()
  createdAt: Date;
  @CreateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
