import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { User } from '../users/user.entity.js';

@Entity()
@Unique('providerId_accountId', ['providerId', 'accountId'])
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  password?: string;

  @Column()
  providerId: string;

  @Column()
  accountId: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @ManyToOne(() => User, (user) => user.auths, {
    onDelete: 'CASCADE',
  })
  user: Relation<User>;
}
