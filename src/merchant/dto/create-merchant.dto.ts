import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateMerchantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  BusinessName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  BusinessDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  // @IsPhoneNumber()
  phoneNo: string;

  @ApiProperty()
  @IsOptional()
  BusinessAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean = true;
}
