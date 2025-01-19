import { HttpException, Injectable } from '@nestjs/common';
import { UserDTO } from './userDto/user-dto';

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
  async getAllUsers(): Promise<UserDTO[]> {
    return this.users;
  }

  async getUserById(id: number): Promise<UserDTO> {
    const user = this.users.find((obj) => obj.id === +id);
    if (!user) {
      throw new HttpException('No user found', 412);
    }
    return user;
  }

  async createUser(userDTO: UserDTO): Promise<UserDTO> {
    const newId = this.users[this.users.length - 1].id;
    userDTO['id'] = newId + 1;
    this.users.push(userDTO);
    return this.users[this.users.length - 1];
  }

  async updateUser(id: number, userDto: UserDTO) {
    const dbUser = this.users.find((obj) => obj.id === id);
    if (!dbUser) throw new HttpException('No User Found', 412);
    dbUser['email'] = userDto.email;
    dbUser['name'] = userDto.name;
    dbUser['password'] = userDto.password;
    return this.users;
  }

  async deleteUser(id: number) {
    const userToDeleteIndex = this.users.findIndex((obj) => obj.id === id);
    if (userToDeleteIndex == -1) throw new HttpException('User no found', 412);
    this.users.splice(userToDeleteIndex, 1);
    return this.users;
  }
}
