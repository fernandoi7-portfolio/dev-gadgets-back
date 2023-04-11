import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './models/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() { email, password }: LoginDto) {
    return this.authService.signIn(email, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() { token }: Record<string, string>) {
    return this.authService.refresh(token);
  }
}
