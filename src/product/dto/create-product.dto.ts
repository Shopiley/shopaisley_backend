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
  @IsString()
  SKU: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ImageURL: string;

  // not needed, it populates itself automatically, check entity
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsDate()
  // readonly CreatedAt: Date;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsDate()
  // readonly ModifiedAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}

export class CreateProductDtoResponse extends CreateProductDto {
  readonly id: string;
}