import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async createUser({
    email,
    name,
    password,
    confirm_password,
  }: CreateUserDTO) {
    if (confirm_password !== password) {
      throw new BadRequestException("Passwords must match!");
    }

    const foundUserByEmail = await this.userRepository.findUserByEmail(email);

    if (foundUserByEmail) {
      throw new BadRequestException("User with this email has already been registered");
    }

    const encryptedPassword = await hash(password, 10);

    const user = await this.userRepository.createUser({ email, name, password: encryptedPassword });

    user.password = undefined;

    return user;
  }
}
