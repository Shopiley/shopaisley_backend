import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  user_id: string;

  @Column()
  payment_id: string;

  @Column()
  total: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered'],
    default: 'Pending',
    })
    status: string;
  
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  ModifiedAt: Date;
}
