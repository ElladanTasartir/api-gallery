import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetAuthenticatedUser } from './decorators/auth.decorator';
import { AuthDataDTO } from './dtos/auth-data.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async authenticateUser(
    @Body() authDataDTO: AuthDataDTO
  ) {
    return this.authService.authenticateUser(authDataDTO);
  }
}
