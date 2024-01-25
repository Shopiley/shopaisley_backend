/* eslint-disable prettier/prettier */
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getFilteredProducts(query: Record<string, any>) {
    try {
      const { n, up, iq } = query;

      const where: Record<string, any> = {};

      if (n) where.name = n;

      if (up) where.unitPrice = parseFloat(up);

      if (iq) where.inventory_qty = parseInt(iq, 10);

      const searchResult = await this.productRepository.find({ where });

      return searchResult;
    } catch (err) {
      console.error(err);
      throw err; // You can handle the error at the controller level
    }
  }
}