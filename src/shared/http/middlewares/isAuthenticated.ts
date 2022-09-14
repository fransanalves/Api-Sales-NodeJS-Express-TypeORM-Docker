import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { MessageError } from '@shared/errors/MessageError';

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new MessageError('JWT Token is missing.');
  }
  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secretKey);

    const { sub } = decodeToken as IPayload;

    req.user = { id: sub };

    return next();
  } catch {
    throw new MessageError('JWT Token Invalid.');
  }
}
