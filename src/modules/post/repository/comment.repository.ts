import { Repository } from 'typeorm';

import { CustomRepository } from '../../../db/typeorm-ex.decorator';
import { CommentEntity } from '../comment.entity';

@CustomRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {}
