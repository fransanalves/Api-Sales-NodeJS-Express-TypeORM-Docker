import { MessageError } from '@shared/errors/MessageError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IUser {
  id: string;
}

export class DeleteUserService {
  public async execute({ id }: IUser): Promise<void> {
    const usersRepository = UsersRepository;
    const userId = await usersRepository.findOneBy({ id });
    if (!userId) {
      throw new MessageError('User not found.');
    }
    await usersRepository.remove(userId);
  }
}
