import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { }

  @Post('signup')
  public async createUser(
    @Body() data: CreateUserDto
  ) {
    try {
      return await this.usersService.create(data.email, data.password);
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
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
