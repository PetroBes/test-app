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

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.usersService.findById(session.userId);
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() data: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(data.email, data.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() data: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(data.email, data.password);
    session.userId = user.id;
    return user;
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
