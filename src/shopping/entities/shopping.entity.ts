import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart_item.entity';

@Entity()
export class Shopping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  items: CartItem[];

  @Column()
  createdAt: Date;

  @Column()
  modifiedAt: Date;

  @Column()
  sessionId: number;
}
