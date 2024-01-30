/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilterService } from './filter_search.service';
import { FilterController } from './filter_search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Automatically uses ProductRepository
  controllers: [FilterController],
  providers: [FilterService],
  exports: [FilterService],
})
export class FilterModule {}