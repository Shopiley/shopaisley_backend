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

  @Column()
  password: string;

}