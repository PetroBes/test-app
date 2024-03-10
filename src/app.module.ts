import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'auth-test',
      password: 'test',
      database: 'auth-db',
      synchronize: true, // only use in development environment
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
