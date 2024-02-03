import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from '../constants';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { Request } from 'express';

@Injectable()
export class VerifyLogin implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const access_token = this.extractTokenFromHeader(request);

    if (!access_token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(access_token, {
          secret: jwtConstants.secret,
        }
      );
      if (!payload.user_id) return false;

      const user = await this.userService.findById(payload.user_id);
      const userResponse = new UserResponseDto(user);

      request.user = userResponse;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
