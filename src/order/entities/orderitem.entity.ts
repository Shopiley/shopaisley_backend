import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  CreatedAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  ModifiedAt: Date;
}
