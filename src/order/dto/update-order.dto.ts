import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsBoolean, IsOptional, IsNumber} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//export class UpdateOrderDto extends PartialType(CreateOrderDto) {
export class UpdateOrderDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly status?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  readonly total?: number
}
