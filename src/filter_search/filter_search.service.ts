/* eslint-disable prettier/prettier */
import { Repository, ILike, Between } from 'typeorm'; // Import the ILike operator
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getSearchedName(query: Record<string, any>) {
    try {
      const { n } = query;

      const where: Record<string, any> = {};

      if (n) where.name = ILike(`%${n}%`); // Use ILike operator for case-insensitive partial matching
      const searchResult = await this.productRepository.find({ where });

      return searchResult;
    } catch (err) {
      console.error(err);
      throw err; // You can handle the error at the controller level
    }
  }

  async getRangePrice( min: string, max: string){
    try{
      const where: Record<string, any> ={};
      if (min && max) {
        where.unitPrice = Between(parseFloat(min), parseFloat(max));
      } else if (min) {
        where.unitPrice = Between(parseFloat(min), Infinity);
      } else if (max) {
        where.unitPrice = Between(0, parseFloat(max));
      }
      const searchResult = await this.productRepository.find({ where });
      return searchResult;
    }catch (err) {
      console.error(err);
      throw err;
  }
}
}
