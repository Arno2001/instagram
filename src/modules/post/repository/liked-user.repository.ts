import { DeleteQueryBuilder, Repository } from 'typeorm';

import { CustomRepository } from '../../../db/typeorm-ex.decorator';
import { LikedUserEntity } from '../liked-user.entity';

@CustomRepository(LikedUserEntity)
export class LikedUserRepository extends Repository<LikedUserEntity> {
  async findByUserId(userId: string): Promise<LikedUserEntity | null> {
    const likedUser = this.createQueryBuilder('liked_user')
      .where('liked_user.user_id = :userId', { userId })
      .getOne();

    return likedUser;
  }
  async findAndDelete(
    userId: string,
  ): Promise<DeleteQueryBuilder<LikedUserEntity | null>> {
    return this.createQueryBuilder('liked_user')
      .where('liked_user.user_id = :userId', { userId })
      .delete();
  }
}
