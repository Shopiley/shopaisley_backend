import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly unitPrice: number;

  @IsNotEmpty()
  @IsString()
  readonly SKU: string;

  @IsNotEmpty()
  @IsString()
  readonly ImageURL: string;

  @IsNotEmpty()
  @IsDate()
  readonly CreatedAt: Date;

  @IsNotEmpty()
  @IsDate()
  readonly ModifiedAt: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly discountId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;
}

export class CreateProductDtoResponse extends CreateProductDto {
  readonly id: string;
}
