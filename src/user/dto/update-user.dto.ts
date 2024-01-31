import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsNotEmpty,IsEmail,IsBoolean,IsOptional,IsPhoneNumber,IsString} from 'class-validator'; 

export class UpdateUserDto extends PartialType(CreateUserDto) {      
        
        @IsNotEmpty()
        @IsString()
        firstName: string;
        
        @IsNotEmpty()
        @IsString()
        lastName: string;

        @IsNotEmpty()
        @IsPhoneNumber()
        phoneNo: string;

        @IsOptional()
        @IsBoolean()
        isActive: boolean = true;

        @IsOptional()
        @IsEmail()
        email?: string;


        @IsString()
        password: string;
}
