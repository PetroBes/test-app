import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['asd'],
  }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // don't allow send an additional properties to incoming request
    })
  );
  await app.listen(3000);
}
bootstrap();
