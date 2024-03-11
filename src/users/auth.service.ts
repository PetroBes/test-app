import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { hashPassword, isPasswordValid } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signup(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (user) {
      throw new BadRequestException('Email in use');
    }

    const pass = await hashPassword(password);
    const createdUser = await this.usersService.create(email, pass);
    return createdUser;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!isPasswordValid(password)) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
