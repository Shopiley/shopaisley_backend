import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/order/entities/orderdetails.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderdetailsRepository: Repository<OrderDetails>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDetails> {
    const newOrder: OrderDetails =
      this.orderdetailsRepository.create(createOrderDto);
    return this.orderdetailsRepository.save(newOrder);
  }

  async findAll() {
    return this.orderdetailsRepository.find();
  }

  async findOne(id: string): Promise<OrderDetails | null> {
    const options: FindOneOptions<OrderDetails> = {
      where: { id },
    };

    const order = await this.orderdetailsRepository.findOne(options);
    return order;
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderDetails> {
    const existingOrder = await this.findOne(id);
    Object.assign(existingOrder, updateOrderDto);
    return this.orderdetailsRepository.save(existingOrder);
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
