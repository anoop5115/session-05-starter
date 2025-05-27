import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Address } from "../entities/address.entity.";
import { CreateAddressDto } from "./create-address.dto";
import Employee, { EmployeeRole, Status } from "../entities/employee.entity";
import { Department } from "../entities/department.enity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @MinLength(5)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsNumber()
  department: number;

  @IsEnum(Status)
  status: Status;

  @IsString()
  employeeId: string;

  @IsDate()
  dateOfJoining: Date;

  @IsNumber()
  experience: number;
}
