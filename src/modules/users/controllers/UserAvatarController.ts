import { MessageError } from '@shared/errors/MessageError';
import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';

export class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();
    if (req.file === undefined) {
      throw new MessageError('File not found.');
    }
    const avatar = await updateUserAvatarService.execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(avatar);
  }
}
