import { User } from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export class ListUserService {
  async execute(): Promise<User[]> {
    const repository = UsersRepository;
    const users = await repository.find();

    return users;
  }
}
