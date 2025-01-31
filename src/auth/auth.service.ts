/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInDto: SignInDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(signInDto.password, 10);
    console.log('this is hashed password ', hashedPassword);

    const user = await this.userRepo.findOne({
      where: { name: signInDto.username },
    });

    if (!user) {
      throw new HttpException('User not found', 412);
    }

    if (user && bcrypt.compare(user.password, hashedPassword)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id, email: user.email };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
