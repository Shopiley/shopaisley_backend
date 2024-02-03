/* eslint-disable prettier/prettier */
// import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    id: string;

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
    @IsPhoneNumber()
    phoneNo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isActive: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
  
    constructor(user: User) {
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.phoneNo = user.phoneNo;
      this.isActive = user.isActive;
      this.email = user.email;
    }
}
