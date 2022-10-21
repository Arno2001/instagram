import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'followers' })
export class FollowerEntity extends AbstractEntity {
  @Column()
  @Index()
  user_id: string;

  @Column()
  @Index()
  following_user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.followers)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'following_user_id' })
  following_user: UserEntity;
}
