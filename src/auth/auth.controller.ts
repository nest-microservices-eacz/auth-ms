import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.login.user')
  loginUser() {
    console.log('auth.login.user');
    return 'auth.login.user';
  }

  @MessagePattern('auth.register.user')
  registerUser() {
    console.log('auth.register.user');
    return 'auth.register.user';
  }

  @MessagePattern('auth.verify.user')
  verifyUser() {
    console.log('auth.verify.user');
    return 'auth.verify.user';
  }
}
