import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Column, Entity, Index, Unique } from 'typeorm';

import { TokenTypeEnum } from '../../constants/token-type.enum';

@Entity('users_tokens')
@Unique(['userId', 'type'])
export class UserTokenEntity extends AbstractEntity {
  @Column()
  userId: string;

  @Column({ unique: true })
  @Index()
  token: string;

  @Column({ type: 'enum', enum: TokenTypeEnum })
  type: TokenTypeEnum;
}
