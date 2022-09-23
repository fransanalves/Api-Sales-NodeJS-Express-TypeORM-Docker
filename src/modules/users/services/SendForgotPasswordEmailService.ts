import { MessageError } from '@shared/errors/MessageError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = UsersRepository;
    const userTokensRepository = UserTokensRepository;
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new MessageError('User does not exists.');
    }
    console.log('USER: ', user);
    const token = await userTokensRepository.generate(user.id);
    console.log('TOKEN: ', token);
  }
}
