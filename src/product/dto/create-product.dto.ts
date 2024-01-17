import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly unitPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly SKU: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly ImageURL: string;

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
  readonly discountId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;
}

export class CreateProductDtoResponse extends CreateProductDto {
  readonly id: string;
}
