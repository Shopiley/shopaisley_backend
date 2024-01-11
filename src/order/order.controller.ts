// import { Controller, Get, Post, Body, Param, HttpCode, NotFoundException } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { UserDTO, OrderDTO, PaymentDTO } from './dto/create-order.dto';

// @Controller('orders')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Get('user/:userId')
//   getUserOrders(@Param('userId') userId: string): OrderDTO[] {
//     return this.orderService.getUserOrders(userId);
//   }

//   @Get(':orderId')
//   getOrderDetails(@Param('orderId') orderId: string): OrderDTO {
//     const orderDetails = this.orderService.getOrderDetails(orderId);
//     if (!orderDetails) {
//       throw new NotFoundException('Order not found');
//     }
//     return orderDetails;
//   }

//   @Post()
//   createOrder(@Body() user: UserDTO, @Body('items') items: string[]): OrderDTO {
//     return this.orderService.createOrder(user, items);
//   }

//   @Post('payment')
//   @HttpCode(201)
//   initiatePayment(@Body() order: OrderDTO, @Body('amount') amount: number): PaymentDTO {
//     return this.orderService.initiatePayment(order, amount);
//   }
// }
