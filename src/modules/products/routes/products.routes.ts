import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';

export const router = Router();
const controller = new ProductsController();

router.get('/', controller.list);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
