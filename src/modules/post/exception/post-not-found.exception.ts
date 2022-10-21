import { NotFoundException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor() {
    super('error', 'Can not found Post');
  }
}
