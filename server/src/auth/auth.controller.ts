import { Body, Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request) {
    const user = req.body as any;

    if (!user.email || !user.password) {
      throw new HttpException('Email or password not provided', HttpStatus.BAD_REQUEST);
    }

    return await this.authService.login(user.email, user.password);
  }
}
