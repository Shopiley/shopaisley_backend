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
    private readonly orderRepository: Repository<OrderDetails>,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<OrderDetails> {
  const newOrder: OrderDetails = this.orderRepository.create(createOrderDto);
  return this.orderRepository.save(newOrder);
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<OrderDetails | null> {
    const options: FindOneOptions<OrderDetails> = {
      where: { id },
    };

    const order = await this.orderRepository.findOne(options);

    // if (!product) {
    //   throw new NotFoundException('Product not found');
    // }

    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
