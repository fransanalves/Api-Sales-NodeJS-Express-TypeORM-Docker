import { DataSourceConnection } from '@shared/typeorm/data-source';
import { User } from '../entities/User';

export const UsersRepository = DataSourceConnection.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    const userName = await this.createQueryBuilder('user')
      .where('user.name = :name', { name })
      .getOne();

    return userName;
  },

  async findById(id: string): Promise<User | null> {
    const userId = await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    return userId;
  },

  async findByEmail(email: string): Promise<User | null> {
    const userEmail = await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return userEmail;
  },
});
