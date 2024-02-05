import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber,IsBoolean, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({ default: 'default_payment_id' })
  @IsNotEmpty()
  @IsString()
  payment_id?: string = 'default_payment_id';

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  total?: number = 0;

  @ApiProperty({ default: false})
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

export class CreateOrderDtoResponse extends CreateOrderDto {
  readonly id: string;
}