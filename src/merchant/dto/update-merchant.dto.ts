import { PartialType } from '@nestjs/mapped-types';
import { CreateMerchantDto } from './create-merchant.dto';
import {IsNotEmpty,IsEmail,IsBoolean,IsOptional,IsPhoneNumber,IsString} from 'class-validator'; 

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {      


  @IsNotEmpty()
  @IsString()
  BusinessName: string;

  @IsNotEmpty()
  @IsString()
  BusinessDescription: string;

  @IsNotEmpty()
  // @IsPhoneNumber()
  phoneNo: string;

  @IsOptional()
  BusinessAddress: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

@IsOptional()
@IsBoolean()
isActive: boolean = true;

@IsNotEmpty()
@IsString()
firstName: string;
        
@IsNotEmpty()
@IsString()
lastName: string;
}
