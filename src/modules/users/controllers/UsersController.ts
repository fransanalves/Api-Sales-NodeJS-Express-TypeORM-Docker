import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { ListUserService } from '../services/ListUserService';

export class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const service = new CreateUserService();
    const user = await service.execute({ name, email, password });
    return res.status(201).json(user);
  }

  async list(req: Request, res: Response): Promise<Response> {
    const service = new ListUserService();
    const users = await service.execute();

    return res.status(200).json(users);
  }
}
