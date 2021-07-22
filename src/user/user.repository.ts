import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) { }

  async listUsers() {
    return this.userModel.find();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ 
      email,
    });
  }

  async createUser({ name, email, password }: CreateUserDTO) {
    const createdUser = new this.userModel({
      name,
      email,
      password,
    });

    await createdUser.save();

    return createdUser;
  }
}