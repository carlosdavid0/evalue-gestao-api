import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    try {
      const token = await this.authService.login(loginDto);
      return {
        access_token: token.access_token,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
