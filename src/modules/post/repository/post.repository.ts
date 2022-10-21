import { CustomRepository } from '../../../db/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { PostEntity } from '../post.entity';

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async findAll(): Promise<PostEntity[] | null> {
    const posts = this.createQueryBuilder('post')
      .leftJoinAndSelect('post.liked_users', 'liked_user')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();

    return posts;
  }

  async findById(id: string): Promise<PostEntity | null> {
    const post = this.createQueryBuilder('post')
      .leftJoinAndSelect('post.liked_users', 'liked_user')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('post.id = :postId', { postId: id })
      .getOne();

    return post;
  }

  async getAndJoin(id: string): Promise<PostEntity | null> {
    const post = this.createQueryBuilder('post')
      .leftJoinAndSelect('post.liked_users', 'liked_user')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('post.id = :postId', { postId: id })
      .getOne();

    return post;
  }
}
