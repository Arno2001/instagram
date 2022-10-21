import { Repository } from 'typeorm';

import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { FollowerEntity } from './follower.entity';

@CustomRepository(FollowerEntity)
export class FollowerRepository extends Repository<FollowerEntity> {
  async findById(id: string): Promise<FollowerEntity | null> {
    const follower = this.createQueryBuilder('follower')
      .where('follower.following_user_id = :followerId', { followerId: id })
      .getOne();

    return follower;
  }
}
