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

  async findUser(userId: string) {
    return this.userModel.findOne({
      _id: userId,
    });
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
      gallery: [],
    });

    await createdUser.save();

    return createdUser;
  }
}