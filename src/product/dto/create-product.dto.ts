import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  inventory_qty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  SKU: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ImageURL: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discountId: number;

  @ApiProperty()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  subCategory: string;
}

export class CreateProductDtoResponse extends CreateProductDto {
  readonly id: string;
}