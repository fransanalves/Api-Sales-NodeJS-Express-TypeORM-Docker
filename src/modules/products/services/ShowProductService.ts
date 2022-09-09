import MessageError from '@shared/errors/MessageError';
import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IProduct): Promise<Product> {
    const productRepository = ProductsRepository;
    const productId = await productRepository.findOne({ where: { id } });
    if (!productId) {
      throw new MessageError('Product not found.');
    }

    return productId;
  }
}
