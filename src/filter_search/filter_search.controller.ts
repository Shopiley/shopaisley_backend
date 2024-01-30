/* eslint-disable prettier/prettier */
import { Controller, Get,  Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'; // Import Request and Response
import { FilterService } from './filter_search.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('filter search')
@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  @ApiOperation({ summary: 'filter search' })
  async getQuery(@Req() req: Request, @Res() res: Response) { // Use Request and Response types
    try {
      const query = req.query as {[key: string]: string | string[]};
      const searchResult = await this.filterService.getFilteredProducts(query);

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