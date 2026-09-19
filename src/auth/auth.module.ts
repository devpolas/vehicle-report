import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Auth]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
