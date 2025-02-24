import { AppModule } from './app.module';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Auth-ms');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,

    {
      transport: Transport.NATS,
      options: { servers: envs.natsServers },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );
  await app.listen();
  logger.log(`Orders Microservice running on port ${envs.port}`);
}
bootstrap();
