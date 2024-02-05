import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import RefreshToken from './entities/refresh-token.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    const comparehash = await bcrypt.compare(pass, user?.password);
    if (comparehash === false) {
      throw new UnauthorizedException();
    } else {
      const payload = { email: user.email, user_id: user.id };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
