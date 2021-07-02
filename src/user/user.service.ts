import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>
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

    const foundUserWithEmail = await this.userModel.findOne({ email });

    if (foundUserWithEmail) {
      throw new BadRequestException(`User already registered with email "${email}"`);
    }

    const encryptedPassword = await hash(password, 10);

    const user = new this.userModel({
      email,
      name,
      password: encryptedPassword,
      gallery: [],
    }); 

    await user.save();

    user.password = undefined;

    return user;
  }
}
