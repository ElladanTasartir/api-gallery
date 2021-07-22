import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDataDTO } from "./dtos/auth-data.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  signIn(
    @Body() authDataDTO: AuthDataDTO,
  ) {
    return this.authService.signIn(authDataDTO);
  }
}