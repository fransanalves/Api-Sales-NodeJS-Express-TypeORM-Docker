import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', usersController.list);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);
