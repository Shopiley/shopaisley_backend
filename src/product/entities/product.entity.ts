/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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

  // Constructor to initialize entity fields and generate SKU
  constructor(product?: Partial<Product>) {
    if (product) {
      Object.assign(this, product);
    }
  }

  // BeforeInsert hook to generate SKU if not provided
  @BeforeInsert()
  generateSKU() {
    if (!this.SKU) {
      this.SKU = 'SKU' + this.generateRandomString(5);
    }
  }

  // Function to generate a random alphanumeric string
  private generateRandomString(length: number): string {
    const characters = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }
}
