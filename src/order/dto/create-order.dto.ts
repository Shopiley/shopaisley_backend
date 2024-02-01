import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;
  

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  payment_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
}

export class CreateOrderDtoResponse extends CreateOrderDto {
  readonly id: string;
}