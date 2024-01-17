import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  categoryid: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  CreatedAt: Date;

  @Column()
  ModifiedAt: Date;

}