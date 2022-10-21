import { AbstractEntity } from '../../common/entities/abstract.entity';
import { GenderEnum } from '../../constants/gender.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  userName: string;

  @Column({ nullable: true })
  fullName: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: true })
  gender: GenderEnum;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
