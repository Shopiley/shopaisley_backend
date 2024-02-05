import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsObject,
  IsOptional,
} from 'class-validator';

export class CartItemDto {
  @ApiProperty()
  product_id: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;
}

export class CartDto {
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({ type: [CartItemDto], required: false })
  cart: CartItemDto[];
}
