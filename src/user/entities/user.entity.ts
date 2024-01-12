/* eslint-disable prettier/prettier */
import { Auth } from 'src/auth/entities/auth.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  email: string;

  @OneToOne(() => Auth, { cascade: true, eager: true }) // eager: true loads Auth entity when loading User
  @JoinColumn() // This is the owner side of the relationship
  auth: Auth;
}
