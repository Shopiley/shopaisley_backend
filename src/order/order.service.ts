// import {  OrderDTO, PaymentDTO } from './dto/create-order.dto';
// import { Injectable } from '@nestjs/common';
// import { UserDTO } from './dto/create-order.dto';
// import { User } from 'src/user/entities/user.entity';

// @Injectable()
// export class OrderService {
//   private orders: OrderDTO[] = [];
//   private payments: PaymentDTO[] = [];

//   getUserOrders(userId: string): OrderDTO[] {
//     return this.orders.filter(order => order.userId === userId);
//   }

//   getOrderDetails(orderId: string): OrderDTO | undefined {
//     return this.orders.find(order => order.orderId === orderId);
//   }

//   createOrder(user: User, items: string[]): OrderDTO {
//     const newOrder: OrderDTO = {
//       orderId: `order${this.orders.length + 1}`,
//       userId: user.userId,
//       items,
//     };
//     this.orders.push(newOrder);
//     return newOrder;
//   }

//   initiatePayment(order: OrderDTO, amount: number): PaymentDTO {
//     const newPayment: PaymentDTO = {
//       orderId: order.orderId,
//       amount,
//     };
//     this.payments.push(newPayment);
//     return newPayment;
//   }
// }