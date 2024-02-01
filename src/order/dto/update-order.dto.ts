import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly total?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly user_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly payment_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly status?: string;

}
