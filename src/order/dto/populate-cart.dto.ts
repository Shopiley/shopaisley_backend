import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class CartItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    product_id: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
