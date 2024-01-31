import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  import { User } from 'src/user/entities/user.entity'; // Import User entity if it exists
  import { Product } from 'src/product/entities/product.entity'; // Import Product entity if it exists
  
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
        type: 'enum',
        enum: ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered'],
        default: 'Pending',
    })
    status: string;
  
    @Column({ type: 'timestamp'})
    order_date: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount: number;
  
    // Relationships
    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE'}) 
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'product_id' })
    product: Product;

}
  