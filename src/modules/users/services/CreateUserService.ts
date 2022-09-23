import { MessageError } from '@shared/errors/MessageError';
import { hash } from 'bcryptjs';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: IUser): Promise<User> {
    const userRepository = UsersRepository;
    const userEmailExists = await userRepository.findByEmail(email);
    if (userEmailExists) {
      throw new MessageError('Email already registered.');
    }
    const encryptedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
