import { IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class UserDTO {
  id?: number;

  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  email: string;

  password: string;

  address: CreateAddressDto;
}
