import { MessageError } from '@shared/errors/MessageError';
import { compare } from 'bcryptjs';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IUser {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IUser): Promise<IResponse> {
    const userRepository = UsersRepository;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new MessageError('Email/Password is Incorrect.', 401);
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new MessageError('Email/Password is Incorrect.', 401);
    }

    const token = sign({}, authConfig.jwt.secretKey, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
