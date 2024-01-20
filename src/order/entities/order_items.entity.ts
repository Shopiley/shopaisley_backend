import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
