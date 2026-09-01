import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity.js';
import { Report } from './reports/report.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { Auth } from './auth/auth.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [Auth, User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
