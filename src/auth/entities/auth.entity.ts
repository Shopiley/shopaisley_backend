import { User } from 'src/user/entities/user.entity';
import { Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Entity } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  user: User;
}
