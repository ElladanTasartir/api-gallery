import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

// Requisição -> localhost:3000/users
// Verbos HTTP
// GET -> PEGAR UM DADO
// POST -> CRIAR DADOS
// DELETE -> DELETAR UM DADO
// PUT -> ALTERAR DADOS
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Get()
  getUsers() {
    return this.userService.users;
  }

  @Post()
  createUser(
    @Body() data: any,
  ) {
    const users = this.userService.createUser(data);
    return users;
  }
}
