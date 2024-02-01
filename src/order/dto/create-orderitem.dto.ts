import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  order_id: string;
  

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product_id: string;
}

export class CreateOrderItemDtoResponse extends CreateOrderItemDto {
  readonly id: string;
}