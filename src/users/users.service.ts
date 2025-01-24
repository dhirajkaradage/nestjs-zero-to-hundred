import { HttpException, Injectable } from '@nestjs/common';
import { UserDTO } from './userDto/user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/address/entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userRepository.find({ relations: ['address', 'posts'] });
  }

  async getUserById(id: number): Promise<UserDTO> {
    // const user = this.users.find((obj) => obj.id === +id);
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['address'],
    });
    console.log('thsi is user ', user);
    if (!user) {
      throw new HttpException('No user found', 412);
    }
    return user;
  }

  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    // const newId = this.users[this.users.length - 1].id;
    // userDTO['id'] = newId + 1;
    // this.users.push(userDTO);
    // return this.users[this.users.length - 1];
    const savedAddress = await this.addressRepo.save(userDTO.address);
    userDTO.address = savedAddress;
    return await this.userRepository.save(userDTO);
  }

  async updateUser(id: number, userDto: UserDTO) {
    // const dbUser = this.users.find((obj) => obj.id === id);
    const dbUser = await this.userRepository.findOne({
      where: { id: id },
      relations: ['address'],
    });
    if (!dbUser) throw new HttpException('No User Found', 412);
    // dbUser['email'] = userDto.email;
    // dbUser['name'] = userDto.name;
    // dbUser['password'] = userDto.password;

    // const updatedUser = await this.userRepository.save(dbUser);
    console.log('thsi is user ', dbUser);
    dbUser['email'] = userDto.email;
    dbUser['name'] = userDto.name;
    dbUser['password'] = userDto.password;
    let address: Address;
    if (!dbUser.address && userDto.address) {
      address = await this.addressRepo.save(userDto.address);
      dbUser.address = address;
    } else {
      dbUser.address.city = userDto.address.city;
      dbUser.address.pincode = userDto.address.pincode;
      dbUser.address.country = userDto.address.country;
      dbUser.address.state = userDto.address.state;
      dbUser.address.address = userDto.address.address;
    }

    return await this.userRepository.save(dbUser);
  }

  async deleteUser(id: number) {
    // const userToDeleteIndex = this.users.findIndex((obj) => obj.id === id);
    // if (userToDeleteIndex == -1) throw new HttpException('User no found', 412);
    // this.users.splice(userToDeleteIndex, 1);

    // one way
    // const user = await this.userRepository.findOne({
    //   where: { id: id },
    //   relations: ['address'],
    // });

    // console.log('this is user ', user);

    // if (user.address) {
    //   await this.userRepository.update(user.id, { address: null });

    //   const deletedAddress = await this.addressRepo.delete(user.address.id);
    //   console.log('this is deleted address res ', deletedAddress);
    // }

    // const userToDeleteIndex = await this.userRepository.delete(id);
    // return userToDeleteIndex.affected;

    // 2nd way use cascade in the user entity for address

    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['address'],
    });

    if (user.address) {
      const deletedAddress = await this.addressRepo.delete(user.address.id);
      console.log('this is deleted address res ', deletedAddress);
    }

    return await this.userRepository.delete(id);
  }
}
