import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

import { LikedUserRepository } from './repository/liked-user.repository';
import { PostRepository } from './repository/post.repository';
import { PostNotFoundException } from './exception/post-not-found.exception';
import { LikedUserEntity } from './liked-user.entity';

@Injectable()
export class LikedUserService {
  constructor(
    private readonly likedUserRepository: LikedUserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async likePost(
    user: UserEntity,
    postId: string,
  ): Promise<LikedUserEntity | null | string> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new PostNotFoundException();
    }

    const likedUser = await this.likedUserRepository.findByUserId(user.id);

    if (likedUser) {
      await this.likedUserRepository.delete(likedUser.id);
      return 'Successfully unliked';
    }

    return await this.likedUserRepository.save({
      user: user,
      post: post,
    });
  }
}
