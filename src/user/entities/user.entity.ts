import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phoneNo: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;
}
