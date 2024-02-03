/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  HttpStatus,
  NotFoundException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/product/product.service';
import { VerifyLogin } from 'src/auth/guards/verifylogin.strategy';
import { OrderItems } from './entities/orderitem.entity';
import { CartDto, CartItemDto } from './dto/populate-cart.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly productService: ProductService,) { }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  async create(@Body() createOrderDto: CreateOrderDto, @Res() response) {
    const data = await this.orderService.create(createOrderDto);
    response.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Order created successfully',
      data: data,
    });
  }

  @Patch()
  @ApiOperation({ summary: 'Add a product to cart' })
  @ApiResponse({ status: 201, description: 'Product successfully added to cart' })
  async add_to_cart(@Body() createOrderItemDto: CreateOrderItemDto, @Res() response) {
    const product = await this.productService.findOne(createOrderItemDto.product_id);
    const data = await this.orderService.add_to_cart(createOrderItemDto);
    const cartResponseDto = {
      order_item_id: data.order_id,
      order_id: data.order_id,
      product_id: data.product_id,
      quantity: data.quantity,
      product_name: product.name,
      unit_price: product.unitPrice,
      image_url: product.ImageURL
    }
    response.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Order created successfully',
      data: cartResponseDto,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Orders successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Orders not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async findAll(@Res() response) {
    const data = await this.orderService.findAll();

    response.status(HttpStatus.OK).json({
      status: 'success',
      message: 'Orders retrieved successfully',
      data: data,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({ status: 200, description: 'Order successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const order = await this.orderService.findOne(id);
      const orderItems = await this.orderService.getCartItems(id);

      if (!order) {
        throw new NotFoundException(`Order with id: ${id} not found`); // Use a suitable error type
      }

      const responsePayload = {
        id: order.id,
        user_id: order.user_id,
        total: order.total,
        status: order.status,
        CreatedAt: order.CreatedAt,
        ModifiedAt: order.ModifiedAt,
        order_items: orderItems
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Order retrieved successfully',
        data: responsePayload
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Get('user/:user_id') // Update the route to include userId as a parameter
  @ApiOperation({ summary: 'Get orders by user ID' })
  @ApiResponse({ status: 200, description: 'Orders successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Orders not found for the user' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findByUserId(@Param('user_id') user_id: string, @Res() response) {
    try {
      // Update the service method to retrieve orders by user ID
      const orders = await this.orderService.findByUserId(user_id);

      if (!orders) {
        throw new NotFoundException(
          `Orders not found for user with id: ${user_id}`,
        );
      }

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Patch('checkOut/:id')
  @ApiOperation({ summary: 'Checkout cart' })
  @ApiResponse({ status: 200, description: 'Order status successfully updated' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto, @Res() response) {
    try {
      const orderToUpdate = await this.orderService.findOne(id);

      if (!orderToUpdate) {
        throw new NotFoundException(`Product with id: ${id} not found`);
      }

      const updatedOrder = await this.orderService.update(id, updateOrderDto);

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Order updated successfully',
        data: updatedOrder,
      });

    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }
  }


  @Post('cart')
  @UseGuards(VerifyLogin)
  @ApiOperation({ summary: 'Setup cart after Login' })
  @ApiBearerAuth()
  async setUpCart(@Request() req, @Body() cartDto: CartDto, @Res() response) {
    try{
    const cart = await this.orderService.checkIfCartExists(req.user.id);

    let cartItems: OrderItems[]; 
    if (cartDto.cart) {
      cartItems = await this.orderService.populateCartItems(cart.id, cartDto.cart);
    } else {
      cartItems = await this.orderService.getCartItems(cart.id);
    }

    const responsePayload = {
      id: cart.id,
      user_id: cart.user_id,
      total: cart.total,
      status: cart.status,
      CreatedAt: cart.CreatedAt,
      ModifiedAt: cart.ModifiedAt,
      cart_items: cartItems,
    };

    response.status(HttpStatus.OK).json({
        status: 'success',
      message: 'Cart Set up successfully',
      data: responsePayload,
    });
    }catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });

    }

  }

}
