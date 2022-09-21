import path from 'path';
import fs from 'fs';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { User } from '../typeorm/entities/User';
import { MessageError } from '@shared/errors/MessageError';
import uploadConfig from '@config/upload';

interface IUserAvatar {
  userId: string;
  avatarFilename: string;
}

export class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IUserAvatar): Promise<User> {
    const usersRepository = UsersRepository;
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new MessageError('User not found.');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
