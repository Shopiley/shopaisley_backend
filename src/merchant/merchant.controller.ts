/* eslint-disable prettier/prettier */
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
import { Merchant } from './entities/merchant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

@ApiTags('merchant')
@Controller('merchant')
export class MerchantController {
  // rest of the code...
  constructor(
    private readonly merchantService: MerchantService,
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  // @Version('1')
  @Post('create')
  @ApiOperation({ summary: 'Create a new merchant' })
  @ApiResponse({ status: 201, description: 'merchant successfully created' })
  async create(@Body() createMerchantDto: CreateMerchantDto, @Res() response: Response) {
    const response_data = await this.merchantService.create(createMerchantDto);
    response.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Merchant created successfully',
      data: response_data,
    });
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

@Post()
@ApiOperation({ summary: 'Get buisness names' })
async findMerchantName(@Body() merchantIds: string[], @Res() response: Response): Promise<Response> {
  const bussinessNames = [];
    const merchants = await this.merchantRepository.find({
      where: {
        id: In(merchantIds),
      },
    });

    merchants.forEach((merchant) => {
      if (!merchant) {
        bussinessNames.push(null);
      } else {
        bussinessNames.push(merchant.BusinessName);
      }
    })


  return response.status(HttpStatus.OK).json({
    status: 'success',
    message: 'Merchant Found',
    data: bussinessNames,
  });
}





@Get(':id')
async findOne(@Param('id') id: string, @Res() response: Response) {
  try {
    const merchant = await this.merchantService.findById(id);
    response.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Merchant Found',
      data: merchant,
    });
    return merchant; // You can choose to remove this line if the return value is not needed
  } catch (error) {
    if (error instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        message: error.message,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Internal Server Error',
      });
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
