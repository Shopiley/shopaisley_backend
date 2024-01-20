import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  /* @Get()
  findOrderHistoryByUser(@Param('userId') userId: string) {
    return this.orderService.findOrderHistoryByUser(+userId);
  }*/

  @Patch()
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }
  @Delete()
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
