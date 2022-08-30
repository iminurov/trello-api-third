import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth0')
@ApiTags('Auth0')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'login users',
  })
  @Get('/login')
  async loginUser(@Query('code') code: string) {
    return this.authService.loginUser(code);
  }
}
