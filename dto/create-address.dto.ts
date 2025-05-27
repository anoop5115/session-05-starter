import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;

  @IsString()
  line2: string;

  @IsString()
  houseNo: string;
}
