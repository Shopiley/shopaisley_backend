/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser: User = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const { firstName, lastName, email, phoneNo, isActive, password } = createUserDto;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      phoneNo,
      isActive,
      password: hashedPassword, 
    });

    const savedUser = await this.userRepository.save(user);

    const response = new UserResponseDto(savedUser);

    return response;
  }

  
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
  
  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });

  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({id: id});
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.phoneNo) {
      user.phoneNo = updateUserDto.phoneNo;
    }
    if (updateUserDto.isActive !== undefined) {
      user.isActive = updateUserDto.isActive;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
  
    // Save the updated user entity back to the database
    await this.userRepository.save(user);
  
    return user;
  }
  


}
