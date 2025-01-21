import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class UserDTO {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: CreateAddressDto;
}
