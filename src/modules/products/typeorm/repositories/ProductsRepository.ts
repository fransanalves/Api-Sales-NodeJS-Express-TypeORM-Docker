import { DataSourceConnection } from '@shared/typeorm/data-source';
import { Product } from '../entities/Product';

export const ProductsRepository = DataSourceConnection.getRepository(
  Product,
).extend({
  findByName(name: string) {
    const productName = this.createQueryBuilder('product')
      .where('product.name = :name', { name })
      .getOne();

    return productName;
  },
});
