import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '..//users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '60s',
        secret: process.env.JWT_SECRET,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7 days',
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }

  async refresh(token: string): Promise<any> {
    try {
      const validated = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.usersService.findOne(validated['username']);
      const payload = { username: user.email, sub: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '60s',
          secret: process.env.JWT_SECRET,
        }),
        refresh_token: await this.jwtService.signAsync(payload, {
          expiresIn: '7 days',
          secret: process.env.JWT_REFRESH_SECRET,
        }),
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
