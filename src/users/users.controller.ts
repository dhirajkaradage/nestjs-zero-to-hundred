/* eslint-disable @typescript-eslint/no-unused-vars */
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
import * as bcrypt from 'bcryptjs';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('')
  async getAllUsers() {
    // return this.users;
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(+id);
  }

  @Post('/create')
  async createUser(@Res() res: Response, @Body() userDTO: UserDTO) {
    // const newId = this.users[this.users.length - 1].id;
    // userDTO['id'] = newId + 1;
    // this.users.push(userDTO);
    // return this.users;

    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    console.log('this is hashed password ', hashedPassword);
    userDTO.password = hashedPassword;
    const newUser = await this.userService
      .createUser(userDTO)
      .then((res) => res);
    console.log('thsi is use ', newUser);

    const { password, ...rest } = newUser;
    return res.status(201).json({
      message: 'User created successfully',
      data: rest,
    });
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() userDto: UserDTO) {
    // const dbUser = this.users.find((obj) => obj.id === +id);
    // if (!dbUser) throw new HttpException('No User Found', 412);
    // const dbUserIndex = this.users.findIndex((obj) => obj.id === +id);

    // dbUser['email'] = userDto.email;
    // dbUser['name'] = userDto.name;
    // dbUser['password'] = userDto.password;

    // this.users[dbUserIndex] = dbUser;
    // return this.users;

    return await this.userService.updateUser(+id, userDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    // const userToDeleteIndex = this.users.findIndex((obj) => obj.id === +id);
    // console.log('this is user index ', userToDeleteIndex, +id);

    // if (userToDeleteIndex == -1) throw new HttpException('User no found', 412);
    // this.users.splice(userToDeleteIndex, 1);
    // return this.users;

    return await this.userService.deleteUser(+id);
  }
}
