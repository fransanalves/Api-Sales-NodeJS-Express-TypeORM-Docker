import MessageError from '@shared/errors/MessageError';
import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const productRepository = ProductsRepository;
    const productExists = await productRepository.findByName(name);
    if (productExists) {
      throw new MessageError('There is already one product with this name');
    }
    const product = productRepository.create({
      name,
      price,
      quantity,
    });
    await productRepository.save(product);

    return product;
  }
}
