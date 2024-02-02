import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import RefreshToken from './entities/refresh-token.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { sign, verify } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  private refreshTokens: RefreshToken[] = [];

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retireveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }
    const user = await this.userService.findById(refreshToken.userId);
    if (!user) {
      return undefined;
    }
    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  }


  private retireveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      return undefined;
    }
  }

  async login(
    email: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return undefined;
    }
    if (user.password !== password) {
      return undefined;
    }
    return this.newRefreshandAccessToken(user, values);
  }
  private async newRefreshandAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    this.refreshTokens.push(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retireveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }

    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );
  }

  
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    const comparehash = await bcrypt.compare(pass, user?.password);
    if (comparehash === false) {
      throw new UnauthorizedException();
    } else {
      const payload = { email: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
