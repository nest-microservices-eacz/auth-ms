import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDb Connected');
  }

  async signJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async register(registerDto: RegisterDto) {
    try {
      const { email, password } = registerDto;

      const userExists = await this.user.findUnique({ where: { email } });

      if (userExists) {
        throw new RpcException({
          status: 400,
          message: `User already exists`,
        });
      }

      const { password: _, ...user } = await this.user.create({
        data: { ...registerDto, password: bcrypt.hashSync(password, 10) },
      });

      return { user, token: await this.signJwt(user) };
    } catch (error) {
      throw new RpcException({ status: 400, messaage: error.message });
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      console.log(email);

      const userExists = await this.user.findUnique({ where: { email } });
      console.log(userExists);

      if (!userExists) {
        throw new RpcException({
          status: 400,
          message: `Invalid Credentials`,
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, userExists.password);

      if (!isPasswordValid) {
        throw new RpcException({
          status: 400,
          message: `Invalid Credentials`,
        });
      }

      const { password: _, ...user } = userExists;

      return { user, token: await this.signJwt(user) };
    } catch (error) {
      throw new RpcException({ status: 400, messaage: error.message });
    }
  }
}
