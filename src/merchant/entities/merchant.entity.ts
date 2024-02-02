import { Product } from 'src/product/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
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

  @OneToMany(() => Product, (product) => product.merchant)
  products: Product[];

}