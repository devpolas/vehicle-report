import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity.js';
import { CreateUser } from './user.interface.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async getById(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`);
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User not found with email ${email}`);
    }

    return user;
  }

  async existsById(id: number) {
    return this.userRepository.exists({
      where: { id },
    });
  }

  async existsByEmail(email: string) {
    return this.userRepository.exists({
      where: { email },
    });
  }

  async create(payload: CreateUser) {
    const exists = await this.existsByEmail(payload.email);

    if (exists) {
      throw new BadRequestException('User already exists');
    }

    const user = this.userRepository.create({
      name: payload.name,
      email: payload.email,
    });

    return this.userRepository.save(user);
  }
}
