import { User } from 'src/user/entities/user.entity';
import {
  //   Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn()
  user: User;
}
