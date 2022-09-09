import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';
import { DeleteProductService } from '../services/DeleteProductService';
import { ListProductService } from '../services/ListProductService';
import { ShowProductService } from '../services/ShowProductService';
import { UpdateProductService } from '../services/UpdateProductService';

export class ProductsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const service = new ListProductService();
    const products = await service.execute();

    return res.status(200).json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new ShowProductService();
    const product = await service.execute({ id });

    return res.status(200).json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const service = new CreateProductService();
    const product = await service.execute({ name, price, quantity });

    return res.status(201).json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const service = new UpdateProductService();
    const product = service.execute({ id, name, price, quantity });

    return res.status(204).json(product);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const service = new DeleteProductService();
    await service.execute({ id });

    res.status(204).json();
  }
}
