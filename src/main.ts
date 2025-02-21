import { AppModule } from './app.module';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Auth-ms');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );
  await app.listen(envs.port);
  logger.log(`Orders Microservice running on port ${envs.port}`);
}
bootstrap();
