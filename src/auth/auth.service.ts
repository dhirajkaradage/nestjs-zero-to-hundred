import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateUser(signInDto: SignInDto): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { name: signInDto.username, password: signInDto.password },
    });

    if (!user) {
      throw new HttpException('User not found', 412);
    }
    return user;
  }
}
