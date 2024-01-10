/* eslint-disable prettier/prettier */
import { Auth } from 'src/auth/entities/auth.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNum: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  email: string;

  @OneToOne(() => Auth, { cascade: true })
  auth: Auth;
}
