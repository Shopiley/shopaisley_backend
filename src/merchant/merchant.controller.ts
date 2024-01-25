import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
// import { JSONResponse } from 'nestjs-json-response';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('merchant')
@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  // @Version('1')
  @Post('create')
  @ApiOperation({ summary: 'Create a new merchant' })
  @ApiResponse({ status: 201, description: 'merchant successfully created' })
  create(@Body() createMerchantDto: CreateMerchantDto, @Res() response: Response) {
    const response_data = this.merchantService.create(createMerchantDto);
    return response.status(HttpStatus.OK).json(response_data);
  }

  // @Version('1')
  @Get()
  findAll() {
    return this.merchantService.findAll();
  }

  // @Version('1')
 /* @ApiOperation({ summary: 'Get merchant by ID' })
  @Get(':id')
  @ApiResponse({ status: 201, description: 'merchant successfully found' })
  @ApiResponse({ status: 404, description: 'merchant does not exist' })
  findOne(@Param('id') id: Number) {
    return this.merchantService.findOne(+id);
    
  }
*/
@Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const merchant = await this.merchantService.findById(id);
      return merchant; // You can return the merchant directly or create a DTO for a more structured response
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }

  // @Version('1')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatemerchantDto: UpdateMerchantDto) {
    return this.merchantService.update(id, updatemerchantDto);
  }

  // @Version('1')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }
}
