import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';

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

  @ApiProperty({
    description: 'Status of the order',
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'processing', 'shipped', 'delivered'])
  status: string;
}

export class CreateOrderDtoResponse extends CreateOrderDto {
  readonly id: string;
}