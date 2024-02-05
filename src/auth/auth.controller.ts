import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyLogin } from './guards/verifylogin.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  async signIn(@Body() body: LoginDto, @Res() response) {
    const response_data = await this.authService.signIn(body.email, body.password);
    response.status(HttpStatus.OK).json({
      status: 'success',
      message: 'User login successful',
      data: response_data,
    });
  }


  @UseGuards(VerifyLogin)
  @Get('profile')
  getProfile(@Request() req) {
    if (req.user) {
      console.log('req.user', typeof req.user.id, req.user.id);
      return req.user;
    } else {
      throw new UnauthorizedException();
    }
  }

}

