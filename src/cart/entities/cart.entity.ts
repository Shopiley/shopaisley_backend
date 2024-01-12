import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  CreatedAt: Date;

  @Column()
  ModifiedAt: Date;

  @Column('uuid')
  session_id: string;

}