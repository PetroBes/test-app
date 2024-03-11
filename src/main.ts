import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['asd'],
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
