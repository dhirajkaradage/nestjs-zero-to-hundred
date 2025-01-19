import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserDTO } from './userDto/user-dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
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
  constructor(private userService: UsersService) {}

  @Get('')
  getAllUsers() {
    // return this.users;
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    // const user = this.users.find((obj) => obj.id === +id);
    // if (!user) {
    //   throw new HttpException('No user found', 412);
    // }
    // return user;
    return this.userService.getUserById(+id);
  }

  @Post('/create')
  createUser(@Res() res: Response, @Body() userDTO: UserDTO) {
    // const newId = this.users[this.users.length - 1].id;
    // userDTO['id'] = newId + 1;
    // this.users.push(userDTO);
    // return this.users;
    const newUser = this.userService.createUser(userDTO).then((res) => res);
    console.log('thsi is use ', newUser);

    return res.status(201).json({
      message: 'User created successfully',
      data: newUser,
    });
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDTO) {
    // const dbUser = this.users.find((obj) => obj.id === +id);
    // if (!dbUser) throw new HttpException('No User Found', 412);
    // const dbUserIndex = this.users.findIndex((obj) => obj.id === +id);

    // dbUser['email'] = userDto.email;
    // dbUser['name'] = userDto.name;
    // dbUser['password'] = userDto.password;

    // this.users[dbUserIndex] = dbUser;
    // return this.users;

    return this.userService.updateUser(+id, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    // const userToDeleteIndex = this.users.findIndex((obj) => obj.id === +id);
    // console.log('this is user index ', userToDeleteIndex, +id);

    // if (userToDeleteIndex == -1) throw new HttpException('User no found', 412);
    // this.users.splice(userToDeleteIndex, 1);
    // return this.users;

    return this.userService.deleteUser(+id);
  }
}
