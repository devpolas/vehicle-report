import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from '../auth/auth.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;
}
