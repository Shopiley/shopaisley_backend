// cart_item.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Shopping } from './shopping.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  createdAt: Date;

  @Column()
  modifiedAt: Date;

  @ManyToOne(() => Shopping, cart => cart.items)
  cart: Shopping;

  @Column()
  sessionId: number;
}
