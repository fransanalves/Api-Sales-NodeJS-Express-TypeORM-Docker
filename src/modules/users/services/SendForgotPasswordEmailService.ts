import { MessageError } from '@shared/errors/MessageError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { EtherealMail } from '@config/mail/EtherealMail';

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
    const { token } = await userTokensRepository.generate(user.id);
    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
