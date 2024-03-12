import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    const user = await this.repo.findOneBy({ email: createUserDto.email });
    if (user) {
      throw new UnprocessableEntityException('Email already exists');
    }
  }

  async create(data: CreateUserDto) {
    await this.validateCreateUserDto(data);

    const user = this.repo.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
    return this.repo.save(user);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Email does not exist');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.repo.findOne({ where: { ...getUserDto } });
  }

  findById(id: string) {
    return id ? this.repo.findOneBy({ id }) : null;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateUser = { ...user, ...attrs };
    return this.repo.save(updateUser);
  }

  async removeById(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
}
