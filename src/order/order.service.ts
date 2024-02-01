import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/order/entities/orderdetails.entity';
import { OrderItems } from 'src/order/entities/orderitem.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderdetailsRepository: Repository<OrderDetails>,
    @InjectRepository(OrderItems)
    private readonly orderitemsRepository: Repository<OrderItems>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDetails> {
    const newOrder: OrderDetails =
      this.orderdetailsRepository.create(createOrderDto);
    return this.orderdetailsRepository.save(newOrder);
  }

  async add_to_cart(createOrderItemDto: CreateOrderItemDto): Promise<OrderItems> {
    const newOrderItem: OrderItems =
    this.orderitemsRepository.create(createOrderItemDto);
    return this.orderitemsRepository.save(newOrderItem);
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

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderDetails> {
    const existingOrder = await this.findOne(id);
  
    // Only update the status property if it is present in the updateOrderDto
    if (updateOrderDto.status) {
      existingOrder.status = updateOrderDto.status;
    }
  
    return this.orderdetailsRepository.save(existingOrder);
  }
  

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
