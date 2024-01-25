/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilterService } from './filter_search.service';
import { FilterController } from './filter_search.controller';


@Module({
  imports: [], // Automatically uses ProductRepository
  controllers: [FilterController],
  providers: [FilterService],
  exports: [FilterService],
})
export class FilterModule {}