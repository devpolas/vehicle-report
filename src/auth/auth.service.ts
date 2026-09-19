import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Auth } from './auth.entity.js';
import { CreateAccount } from './auth.interface.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,

    private readonly usersService: UsersService,
  ) {}

  async existsByProviderIdAccountId(payload: {
    providerId: string;
    accountId: string;
  }) {
    return this.authRepository.exists({
      where: {
        providerId: payload.providerId,
        accountId: payload.accountId,
      },
    });
  }

  async create(payload: CreateAccount) {
    const exists = await this.existsByProviderIdAccountId({
      providerId: payload.providerId,
      accountId: payload.accountId,
    });

    if (exists) {
      throw new BadRequestException('Account already exists');
    }

    const account = this.authRepository.create({
      providerId: payload.providerId,
      accountId: payload.accountId,
      ...(payload.password && {
        password: payload.password,
      }),
    });

    const user = await this.usersService.create({
      name: payload.name,
      email: payload.email,
    });

    await this.authRepository.save(account);

    return user;
  }
}
