import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpStatus,
  Res
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
  create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const response_data = this.userService.create(createUserDto);
    return response.status(HttpStatus.OK).json(response_data);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Version('1')
  @ApiOperation({ summary: 'Get user by ID' })
  @Get(':id')
  @ApiResponse({ status: 201, description: 'User successfully found' })
  @ApiResponse({ status: 404, description: 'User does not exist' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
