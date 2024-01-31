/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
// import { JSONResponse } from 'nestjs-json-response';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Version('1')
  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created' })
  async create(@Body() createUserDto: CreateUserDto, @Res() response) {
    const response_data = await this.userService.create(createUserDto);
    response.status(HttpStatus.CREATED).json({
      status: 'success',
      message: 'Product created successfully',
      data: response_data,
    });
  }

  // @Version('1')
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }


@Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findById(id);
      return user; // You can return the user directly or create a DTO for a more structured response
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Rethrow other errors
    }
  }

  // @Version('1')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // @Version('1')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
