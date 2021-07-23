import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { jwt } from "../../config";

export const GetAuthenticatedUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization) {
      throw new UnauthorizedException("JWT wasn't provided");
    }

    const [, token] = authorization.split(' ');
  

    try {
      const decoded = verify(token, jwt.secret);

      const { sub } = decoded;

      return sub;
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT provided');
    }
  }
);