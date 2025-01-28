import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);

    if (user) {
    }
  }
}
