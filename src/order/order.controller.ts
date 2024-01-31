import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  Post,
  Body, 
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  async create(@Body() createOrderDto: CreateOrderDto, @Res() response) {
    const data = await this.orderService.create(createOrderDto);
    response.status(HttpStatus.CREATED).json({
    status: 'success',
    message: 'Order created successfully',
    data: data,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Orders successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Orders not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async findAll(@Res() response) {
    const data = await this.orderService.findAll();

    response.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Orders retrieved successfully',
      data: data,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: number, @Res() response) {
    try {
      const order = await this.orderService.findOne(id);

      if (!order) {
        throw new NotFoundException(`Order with id: ${id} not found`); // Use a suitable error type
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Order retrieved successfully',
        data: order,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}

