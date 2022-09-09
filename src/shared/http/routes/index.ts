import { Router } from 'express';
import { router } from '@modules/products/routes/products.routes';

export const routes = Router();

routes.use('/products', router);
