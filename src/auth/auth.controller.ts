import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginDto: LoginDto) {
    console.log('auth.login.user');
    console.log(loginDto);

    return 'auth.login.user';
  }

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerDto: RegisterDto) {
    console.log('auth.register.user');
    console.log(registerDto);

    return 'auth.register.user';
  }

  @MessagePattern('auth.verify.user')
  verifyUser() {
    console.log('auth.verify.user');
    return 'auth.verify.user';
  }
}
