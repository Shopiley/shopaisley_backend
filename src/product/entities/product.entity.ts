import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unitPrice: number;

  @Column()
  SKU: string;

  @Column()
  ImageURL: string;

  @Column()
  CreatedAt: Date;

  @Column()
  ModifiedAt: Date;

  @Column()
  discountId: number;

  @Column({ name: 'categoryid' }) // This is the foreign key
  categoryId: number;
}
