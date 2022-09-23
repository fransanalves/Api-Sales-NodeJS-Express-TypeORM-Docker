import { DataSourceConnection } from '@shared/typeorm/data-source';
import { UserToken } from '../entities/UserToken';

export const UserTokensRepository = DataSourceConnection.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOneBy({ token });

    return userToken;
  },

  async generate(user_id: string): Promise<UserToken | null> {
    const userToken = await this.create({ user_id });

    await this.save(userToken);

    return userToken;
  },
});
