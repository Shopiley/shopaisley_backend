/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDetails{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  total: number;

  @Column()
  status: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  ModifiedAt: Date;

  
}
