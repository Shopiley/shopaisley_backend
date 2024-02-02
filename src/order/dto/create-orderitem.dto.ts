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

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

}

export class CreateOrderItemDtoResponse extends CreateOrderItemDto {
  readonly id: string;
}