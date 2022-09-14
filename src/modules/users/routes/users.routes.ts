import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { isAuthenticated } from '../../../shared/http/middlewares/isAuthenticated';

export const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.list);
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
