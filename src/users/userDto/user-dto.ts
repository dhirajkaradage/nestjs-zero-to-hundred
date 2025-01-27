import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class UserDTO {
  id?: number;

  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsEmail({}, { message: 'Provide Proper Email Id' })
  email: string;

  @IsString({ message: 'Password Must be string' })
  @Length(8, 24, {
    message: 'Password Must be Minimum 8 characters and max 24 characters',
  })
  password: string;

  @IsNotEmpty({ message: 'Address is required.' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
