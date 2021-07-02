import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Post()
  async createUser(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.createUser(createUserDTO);
  }
}
