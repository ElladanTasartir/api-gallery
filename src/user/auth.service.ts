import { Injectable, UnauthorizedException } from "@nestjs/common";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { jwt } from "../config";
import { AuthDataDTO } from "./dtos/auth-data.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async signIn(authDataDTO: AuthDataDTO) {
    const { email, password } = authDataDTO;

    const foundUserByEmail = await this.userRepository.findUserByEmail(email);

    if (!foundUserByEmail) {
      throw new UnauthorizedException("Incorrect email/password combination");
    }

    const passwordMatched = await compare(password, foundUserByEmail.password);

    if (!passwordMatched) {
      throw new UnauthorizedException("Incorrect email/password combination");
    }

    const { expiresIn, secret } = jwt;

    const token = sign({}, secret, {
      expiresIn,
      subject: String(foundUserByEmail._id),
    });

    return {
      _id: foundUserByEmail._id,
      token,
    };
  }
}