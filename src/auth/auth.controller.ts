import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);
    console.log('this is user ', user);

    if (user) {
      return await this.authService.login(user);
    }
  }
}
