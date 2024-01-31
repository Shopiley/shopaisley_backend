import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  BusinessName: string;

  @Column()
  BusinessDescription: string;

  @Column({ default: true })
  BusinessAddress: string;

  @Column()
  email: string;

}