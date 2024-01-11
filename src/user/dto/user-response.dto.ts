/* eslint-disable prettier/prettier */
// import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    phoneNo: string;
    isActive: boolean;
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