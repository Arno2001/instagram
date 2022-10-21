import { Injectable } from '@nestjs/common';
import { CommentRepository } from './repository/comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async postComment(user, postId: string, createCommentDto: CreateCommentDto) {
    const post = await this.postRepository.findById(postId);
    const comment = this.commentRepository.save({
      user: user,
      post: post,
      comment: createCommentDto.comment,
    });
    return comment;
  }

  async removeComment(postId: string, commentId: string): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}
