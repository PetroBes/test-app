import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) { }

  create(email: string, password: string) {
    try {
      const user = this.repo.create({ email, password });
      return this.repo.save(user);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  findById(id: string) {
    return this.repo.findOneBy({ id });
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
