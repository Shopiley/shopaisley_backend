import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MerchantResponseDto } from './dto/merchant-response.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createMerchantDto: CreateMerchantDto): Promise<MerchantResponseDto> {
    const existingMerchant: Merchant = await this.findOneByEmail(createMerchantDto.email);
    if (existingMerchant) {
      throw new ConflictException('merchant already exists');
    }

    const { BusinessName, BusinessAddress, BusinessDescription,  email} = createMerchantDto;

    const merchant = this.merchantRepository.create({
      BusinessAddress,
      BusinessDescription,
      BusinessName,
      email,
      
    });


    const savedMerchant = await this.merchantRepository.save(merchant);
    

    const { password, firstName, lastName, phoneNo  } = createMerchantDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNo: phoneNo,
      });

      await this.userRepository.save(user);
 

    if (!merchant) {
      throw new NotFoundException(`User with ID not found`);
    }

    return merchant;
  }
  
  async findAll(): Promise<Merchant[]> {
    return this.merchantRepository.find();
  }

  async findById(id: string): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOne({
      where: { id: id },
    });

    if (!merchant) {
      throw new NotFoundException(`merchant with ID ${id} not found`);
    }

    return merchant;
  }
  
  
  async remove(id: string): Promise<void> {
    const merchant = await this.merchantRepository.findOneBy({id: id});
  
    if (!merchant) {
      throw new NotFoundException(`Merchant with ID ${id} not found`);
    }
  
    await this.merchantRepository.remove(merchant);
  }
  
  
  

  async findOneByEmail(email: string): Promise<Merchant | undefined> {
    return await this.merchantRepository.findOne({ where: { email } });

  }

  async update(id: string, updateMerchantDto: UpdateMerchantDto): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOneBy({id: id});
  
    if (!merchant) {
      throw new NotFoundException(`merchant with ID ${id} not found`);
    }
  
    if (updateMerchantDto.BusinessAddress) {
      merchant.BusinessAddress = updateMerchantDto.BusinessAddress;
    }
    if (updateMerchantDto.BusinessDescription) {
      merchant.BusinessDescription = updateMerchantDto.BusinessDescription;
    }
    
    if (updateMerchantDto.BusinessName) {
      merchant.BusinessName = updateMerchantDto.BusinessName;
    }
    if (updateMerchantDto.email) {
      merchant.email = updateMerchantDto.email;
    }
  
    // Save the updated user entity back to the database
    await this.merchantRepository.save(merchant);
  
    return merchant;
  }
  


}