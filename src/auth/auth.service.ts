import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('AuthService');

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDb Connected');
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

      return { user };
    } catch (error) {
      throw new RpcException({ status: 400, messaage: error.message });
    }
  }
}
