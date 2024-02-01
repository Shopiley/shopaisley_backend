import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import RefreshTokenDto from './dto/refresh-token.dto';
import { request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login Users' })
  @ApiResponse({ status: 201, description: 'User logged in' })
  async login(@Param('ip') ip:string, @Body() body : LoginDto){
    return this.authService.login(body.email, body.password,{
      ipAddress: ip, 
      userAgent: request.headers['user-agent'],
    });
  }

  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto){
    return this.authService.refresh(body.refreshToken)
  }

  @Delete("logout")
  @ApiOperation({ summary: 'Logout Users' })
  @ApiResponse({ status: 201, description: 'User logged out' })
  async logout(@Body() body: RefreshTokenDto){
    return this.authService.logout(body.refreshToken)
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() body : LoginDto) {
    return this.authService.signIn(body.email, body.password);
  }
}

