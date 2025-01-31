import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  id?: number;

  @IsNotEmpty({ message: 'Pincode is required.' })
  pincode: number;

  @IsNotEmpty({ message: 'City is required.' })
  city: string;

  @IsNotEmpty({ message: 'State is required.' })
  state: string;

  @IsNotEmpty({ message: 'Country is required.' })
  country: string;

  @IsNotEmpty({ message: 'Address is required.' })
  address: string;
}
