import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../models/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('/whoami')
  @UseGuards(LocalAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.login(user, response);
    return user;
  }
}
