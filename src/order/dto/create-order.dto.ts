import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber,IsBoolean, IsOptional } from 'class-validator';

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

  @ApiProperty({ default: false})
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

export class CreateOrderDtoResponse extends CreateOrderDto {
  readonly id: string;
}