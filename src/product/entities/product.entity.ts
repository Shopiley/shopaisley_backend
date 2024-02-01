/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unitPrice: number;

  @Column({nullable: true})
  inventory_qty: number;

  @Column({ unique:true })
  SKU: string;

  @Column()
  ImageURL: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP'})
  CreatedAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  ModifiedAt: Date;

  @Column()
  discountId: number;

  @Column()
  category: string;

  @Column()
  subCategory: string;

  @Column()
  merchantId: string;
}
