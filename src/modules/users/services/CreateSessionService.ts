import { MessageError } from '@shared/errors/MessageError';
import { compare } from 'bcryptjs';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IUser {
  email: string;
  password: string;
}

export class CreateSessionService {
  public async execute({ email, password }: IUser): Promise<User> {
    const userRepository = UsersRepository;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new MessageError('Email/Password is Incorrect.', 401);
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new MessageError('Email/Password is Incorrect.', 401);
    }

    return user;
  }
}
