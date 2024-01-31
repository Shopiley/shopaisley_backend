/* eslint-disable prettier/prettier */
import { Controller, Get, Body, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { FilterService } from './filter_search.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('filter search')
@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('search')
  @ApiOperation({ summary: 'Filter search' })
  @ApiQuery({name: 'n', required: true})
  async getQuery(@Query() filterCriteria: Record<string, any>, @Res() res: Response) {
    try {
      const searchResult = await this.filterService.getSearchedName(filterCriteria);

      if (searchResult.length === 0) {
        res.status(404).json({ message: 'No matching products found' });
      } else {
        res.status(200).json(searchResult);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }

  @Get('range')
  @ApiOperation({ summary: 'Range of Prices' })
  @ApiQuery({ name: 'min', required: true })
  @ApiQuery({ name: 'max', required: true })
  async getRange(
    @Query('min') min: string,
    @Query('max') max: string,
    @Res() res: Response
  ) {
    try {
      const searchResult = await this.filterService.getRangePrice(min, max);

      if (searchResult.length === 0) {
        res.status(404).json({ message: 'No matching products found' });
      } else {
        res.status(200).json(searchResult);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }
}
