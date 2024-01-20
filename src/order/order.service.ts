import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order_items.entity';
import { OrderDetails } from './entities/order_details.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderItem> {
    const newOrder = this.orderItemRepository.create(createOrderDto);
    return this.orderItemRepository.save(newOrder);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderItem> {
    const existingOrder = await this.findOne(id);
    Object.assign(existingOrder, updateOrderDto);
    return this.orderItemRepository.save(existingOrder);
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Order not found');
    }
  }

  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find();
  }

  async findOne(id: string): Promise<OrderItem> {
    const options: FindOneOptions<OrderItem> = {
      where: { id },
    };
    const product = await this.orderItemRepository.findOne(options);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
