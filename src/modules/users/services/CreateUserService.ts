import { MessageError } from '@shared/errors/MessageError';
import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: IUser): Promise<User> {
    const repository = UsersRepository;
    const isRegisteredEmail = await repository.findByEmail(email);
    if (isRegisteredEmail) {
      throw new MessageError('Email already registered.');
    }
    const user = repository.create({ name, email, password });

    await repository.save(user);

    return user;
  }
}
