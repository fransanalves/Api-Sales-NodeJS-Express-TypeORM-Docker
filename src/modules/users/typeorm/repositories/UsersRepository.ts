import { DataSourceConnection } from '@shared/typeorm/data-source';
import { User } from '../entities/User';

export const UsersRepository = DataSourceConnection.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const user = await this.findOneBy({ name });

    return user;
  },

  async findById(id: string): Promise<User | null> {
    const user = await this.findOneBy({ id });

    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOneBy({ email });

    return user;
  },
});
