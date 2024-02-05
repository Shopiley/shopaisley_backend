import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/order/entities/orderdetails.entity';
import { OrderItems } from 'src/order/entities/orderitem.entity';
import { FindOneOptions } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { CartDto, CartItemDto } from './dto/populate-cart.dto';

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
    const newOrderItem: OrderItems = this.orderitemsRepository.create(createOrderItemDto);
    const oldOrderItem = await this.orderitemsRepository.findOne({
      where: {
        product_id: newOrderItem.product_id,
        order_id: newOrderItem.order_id,
      },
    });
    if (oldOrderItem) {
      oldOrderItem.quantity = newOrderItem.quantity;
      return this.orderitemsRepository.save(oldOrderItem);
    }
    else{
      const savedNewOrderItem =  this.orderitemsRepository.save(newOrderItem);
      const total = newOrderItem.quantity * newOrderItem.price;
      await this.update(newOrderItem.order_id, { total: total });
      return savedNewOrderItem;
    }

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

  async findByUserId(user_id: string): Promise<OrderDetails | null> {
    const options: FindOneOptions<OrderDetails> = {
      where: { user_id },
    };

    const order = await this.orderdetailsRepository.findOne(options);
    return order;
  }

  

  async update(id: string, updateOrderDto: UpdateOrderDto,): Promise<OrderDetails> {
    const existingOrder = await this.findOne(id);

    // Only update the status property if it is present in the updateOrderDto
    if (updateOrderDto.status) {
      existingOrder.status = updateOrderDto.status;
    }

    if (updateOrderDto.total) {
      existingOrder.total += updateOrderDto.total;
    }

    return this.orderdetailsRepository.save(existingOrder);
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }


  async getCartItems(order_id: string): Promise<OrderItems[]> {
    const options: FindOneOptions<OrderItems> = {
      where: { order_id },
    };

    const order = await this.orderitemsRepository.find(options);
    return order;
  }

  async checkIfCartExists(user_id: string): Promise<OrderDetails | null> {
    //checks if an open cart exists for the user, otherwise creates a new one
    const options: FindOneOptions<OrderDetails> = {
      where: { user_id, status: false },
    };

    let cart = await this.orderdetailsRepository.findOne(options);
    if (!cart) {
      const newCart = await this.create({ user_id, status: false, total: 0});
      cart = newCart;
    }
    // const cartItems = await this.getCartItems(cart.id);
    return cart; 
  }

  async populateCartItems(order_id: string, cart: CartItemDto[]): Promise<OrderItems[]> {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      const product_id = product.product_id;
      const quantity = product.quantity;
      const price = product.price;
      total += price * quantity;
      await this.add_to_cart({
        order_id: order_id,
        product_id: product_id,
        price: price,
        quantity: quantity,
      });
    }
    await this.update(order_id, { total: total });
    return await this.getCartItems(order_id);
      // await this.orderdetailsRepository.findOne({ where: { id: order_id } })
  }


  async getCartTotal(order_id: string): Promise<number> {
    const cart = await this.getCartItems(order_id);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity * cart[i].price;
    }
    return total;
  }
}
