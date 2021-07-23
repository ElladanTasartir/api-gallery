import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(
    @Body() createUserDTO: CreateUserDTO,
  ) {
    return this.userService.createUser(createUserDTO);
  }
}
