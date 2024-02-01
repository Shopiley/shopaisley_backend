import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//export class UpdateOrderDto extends PartialType(CreateOrderDto) {
export class UpdateOrderDto{
  @ApiProperty({
    description: 'Status of the order',
    enum: ['pending', 'processing', 'shipped', 'delivered'], // Define your options here
    default: 'pending', // Set a default value if needed
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'processing', 'shipped', 'delivered'])
  readonly status?: string;
}
