import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getHello(): Promise<User[]> {
    return this.appService.getHello();
  }
}
