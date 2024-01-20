import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
