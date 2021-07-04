import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDataDTO } from "./dtos/auth-data.dto";
import { UserRepository } from "./user.repository";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { jwt } from "../config";

@Injectable()
export class AuthService {
  constructor (
    private userRepository: UserRepository, 
  ) {}

  async authenticateUser(authDataDTO: AuthDataDTO) {
    const { email, password } = authDataDTO;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect email/password combination');
    }

    const { secret, expiresIn } = jwt;

    const token = sign({}, secret, {
      subject: String(user._id),
      expiresIn,
    });

    return {
      _id: user._id,
      token,
    };
  }
}