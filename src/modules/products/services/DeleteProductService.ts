import MessageError from '@shared/errors/MessageError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
}

export class DeleteProductService {
  public async execute({ id }: IProduct): Promise<void> {
    const productRepository = ProductsRepository;
    const productId = await productRepository.findOne({ where: { id } });
    if (!productId) {
      throw new MessageError('Product not found.');
    }
    await productRepository.remove(productId);
  }
}
