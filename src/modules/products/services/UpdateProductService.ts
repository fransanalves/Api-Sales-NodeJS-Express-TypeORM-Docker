import { MessageError } from '@shared/errors/MessageError';
import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IProduct): Promise<Product> {
    const productRepository = ProductsRepository;
    const product = await productRepository.findOne({ where: { id } });
    const productNameExists = await productRepository.findByName(name);
    if (!product) {
      throw new MessageError('Product not found.');
    }
    if (productNameExists && product.name !== name) {
      throw new MessageError('There is already one product with this name');
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}
