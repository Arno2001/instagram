import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'liked_users' })
export class LikedUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  post_id: string;

  @Column()
  @Index()
  user_id: string;

  @ManyToOne(() => PostEntity, (post) => post.liked_users)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
