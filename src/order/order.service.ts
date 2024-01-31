import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './entities/orderdetails.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderRepository: Repository<OrderDetails>,
  ) {}

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
}

/*import { Injectable } from '@nestjs/common';
import { OrderDetails } from 'src/order/entities/orderdetails.entity'; // Replace with the correct path

@Injectable()
export class OrderService {
  async getAllOrders(): Promise<OrderDetails[]> {
    // Logic to retrieve all orders
    const orders = await OrderDetails.find();
    return orders;
  }

  async getOrderById(orderId: string): Promise<OrderDetails> {
    // Logic to retrieve order by orderId
    const order = await OrderDetails.findOne(orderId);
    return order;
  }

  async getOrderHistoryByUserId(userId: string): Promise<OrderDetails[]> {
    // Logic to retrieve order history by userId
    const orders = await OrderDetails.find({ where: { user_id: userId } });
    return orders;
  }
}
*/
