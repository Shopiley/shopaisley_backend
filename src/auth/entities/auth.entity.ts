import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  user: User;
}
