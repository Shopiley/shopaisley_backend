import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly unitPrice?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly ImageURL?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly discountId?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly category?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly subCategory?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly merchantId?: string;
}
