import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signup(@Body() body: AuthDto) {
    return this.authService.create({
      ...body,
      accountId: body.email,
      providerId: 'credentials',
    });
  }
}
