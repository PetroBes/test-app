import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  @Post('/signup')
  createUser(@Body() data: CreateUserDto) {
    return this.authService.signup(data.email, data.password);
  }

  @Post('/signin')
  signin(@Body() data: CreateUserDto) {
    return this.authService.signin(data.email, data.password);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  findAll(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto
  ) {
    return this.usersService.update(id, data);
  }



  @Delete('/:id')
  removeById(@Param('id') id: string) {
    return this.usersService.removeById(id);
  }
}
