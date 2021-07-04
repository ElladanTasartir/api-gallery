import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from '../schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository
  ) { }

  async createUser({
    email,
    name,
    password,
    confirm_password,
  }: CreateUserDTO): Promise<User> {
    if (confirm_password !== password) {
      throw new BadRequestException('Passwords must match!');
    }

    const foundUserWithEmail = await this.userRepository.findByEmail(email);

    if (foundUserWithEmail) {
      throw new BadRequestException(`User already registered with email "${email}"`);
    }

    const encryptedPassword = await hash(password, 10);

    const user = await this.userRepository.createUser({ email, name, password: encryptedPassword });

    user.password = undefined;

    return user;
  }
}
