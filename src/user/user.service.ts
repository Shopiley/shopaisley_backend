import { ConflictException, Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const { firstName, lastName, email, phoneNo, isActive } = createUserDto;

    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      phoneNo,
      isActive,
    });

    const savedUser = await this.userRepository.save(user);

    const { password } = createUserDto;

    const auth = this.authRepository.create({
      userId: savedUser.id,
      password: password,
      // user: savedUser,
    });

    await this.authRepository.save(auth);

    // Assign the auth relation to the user and save the user entity with the updated relation
    const response = new UserResponseDto(savedUser);

    savedUser.auth = auth;
    await this.userRepository.save(savedUser);

    return response;
  }

  findAll() {
    return `This action returns all user`;
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
}
