import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

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
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });

  }

 /* async update(id: Number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(+id);

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
    if (updateUserDto.isActive) {
      user.isActive = updateUserDto.isActive;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    // Save the updated user entity back to the database
    await this.userRepository.save(user);

    return user;
  } */


}
