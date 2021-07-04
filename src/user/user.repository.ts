import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDTO } from "./dtos/create-user.dto";

export class UserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>
  ) {}

  async findUser(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async createUser({ email, name, password }: CreateUserDTO): Promise<User> {
    const user = new this.userModel({
      email,
      name,
      password,
      gallery: [],
    }); 

    await user.save();

    return user;
  }
}