import { HttpException, Injectable } from '@nestjs/common';
import { UserDTO } from './userDto/user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  users: UserDTO[] = [
    {
      id: 1,
      email: 'dhiraj@gmail.com',
      name: 'Dhiraj Dk',
      password: 'DhirajDk',
    },
    {
      id: 2,
      email: 'ketan@gmail.com',
      name: 'Ketan Sutar',
      password: 'k10sutar',
    },
  ];

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<UserDTO[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserDTO> {
    // const user = this.users.find((obj) => obj.id === +id);
    const user = await this.userRepository.findOne({ where: { id: id } });
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
    return await this.userRepository.save(userDTO);
  }

  async updateUser(id: number, userDto: UserDTO) {
    // const dbUser = this.users.find((obj) => obj.id === id);
    const dbUser = await this.userRepository.findOne({ where: { id: id } });
    if (!dbUser) throw new HttpException('No User Found', 412);
    dbUser['email'] = userDto.email;
    dbUser['name'] = userDto.name;
    dbUser['password'] = userDto.password;

    const updatedUser = await this.userRepository.save(dbUser);
    return updatedUser;
  }

  async deleteUser(id: number) {
    // const userToDeleteIndex = this.users.findIndex((obj) => obj.id === id);
    const userToDeleteIndex = await this.userRepository.delete(id);
    // if (userToDeleteIndex == -1) throw new HttpException('User no found', 412);
    // this.users.splice(userToDeleteIndex, 1);
    return userToDeleteIndex;
  }
}
