import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../../db/typeorm-ex.module';
import { CommentRepository } from './repository/comment.repository';
import { CommentService } from './comment.service';
import { LikedUserService } from './liked-user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';
import { LikedUserRepository } from './repository/liked-user.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      PostRepository,
      CommentRepository,
      LikedUserRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, CommentService, LikedUserService],
  exports: [PostService, CommentService, LikedUserService],
})
export class PostModule {}
