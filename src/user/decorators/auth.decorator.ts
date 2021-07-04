import { createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { request } from 'express';
import { verify } from 'jsonwebtoken';
import { jwt } from '../../config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const GetAuthenticatedUser = createParamDecorator((
  data,
  context: ExecutionContext,
): string => {
  const { authorization } = context.switchToHttp().getRequest().headers;

  if (!authorization) {
    throw new UnauthorizedException("JWT wasn't provided");
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, jwt.secret);

    const { sub } = decoded as TokenPayload;

    return sub;
  } catch (err) {
    throw new UnauthorizedException("Invalid JWT provided");
  }
});