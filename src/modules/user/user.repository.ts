import { Repository } from 'typeorm';

import { CustomRepository } from '../../db/typeorm-ex.decorator';
import { UserEntity } from './user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findAllUser(): Promise<UserEntity[] | null> {
    const user = this.createQueryBuilder('user').getMany();

    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('user.followers', 'follower')
      .where('user.id = :userId', { userId: id })
      .orWhere('follower.following_user_id = :followId', { followId: id })
      .getOne();

    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return user;
  }

  async findAndJoin(id: string): Promise<UserEntity | null> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('user.followers', 'follower')
      .where('user.id = :userId', { userId: id })
      .getOne();

    return user;
  }

  async getEntityByUserName(userName: string): Promise<UserEntity | null> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('user.followers', 'follower')
      .where('user.userName = :userName', { userName })
      .getOne();

    return user;
  }
}
