import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export class ListUserService {
  async execute(): Promise<User[]> {
    const userRepository = UsersRepository;
    const users = await userRepository.find();

    return users;
  }
}
