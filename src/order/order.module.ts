import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItem } from './entities/order_items.entity';
import { OrderDetails } from './entities/order_details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, OrderDetails])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
