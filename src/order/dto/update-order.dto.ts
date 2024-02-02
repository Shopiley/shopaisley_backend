import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsBoolean, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//export class UpdateOrderDto extends PartialType(CreateOrderDto) {
export class UpdateOrderDto {
  @ApiProperty({default: false})
  @IsOptional()
  @IsBoolean()
  readonly status?: boolean;
}
