/* eslint-disable prettier/prettier */
// import { ApiProperty } from '@nestjs/swagger';
import { Merchant } from '../entities/merchant.entity';

export class MerchantResponseDto {
    id: string;
    BusinessName: string;
    BusinessDescription: string;
    email: string;
    BusinessAddress: string;
    
  
    constructor(merchant: Merchant) {
      this.id = merchant.id;
      this.BusinessName = merchant.BusinessName;
      this.BusinessDescription = merchant.BusinessDescription;
      this.BusinessAddress = merchant.BusinessAddress;
      this.email = merchant.email;
    }
}
