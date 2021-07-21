import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  users = [];

  createUser(user: any) {
    this.users.push(user);
    return this.users;
  }
}
