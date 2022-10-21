import { ConflictException } from '@nestjs/common';

export class PostConflictException extends ConflictException {
  constructor() {
    super('error', 'Post data does not match');
  }
}
