import { AbstractEntity } from '../../common/entities/abstract.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';
import { LikedUserEntity } from './liked-user.entity';

@Entity({ name: 'posts' })
export class PostEntity extends AbstractEntity {
  @Column()
  @Index()
  user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToMany(() => LikedUserEntity, (liked) => liked.post, { nullable: true })
  liked_users: LikedUserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.post, { nullable: true })
  comments: CommentEntity[];
}
