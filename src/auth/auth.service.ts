import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/interfaces/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, { httpOnly: true, expires });

    return user;
  }
}
