/* eslint-disable max-len */
import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import type { UpdateResult } from 'typeorm';
import { UserEntity } from '../user/user.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostConflictException } from './exception/post-conflict.exception';
import { PostNotFoundException } from './exception/post-not-found.exception';
import { PostEntity } from './post.entity';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(
    user: UserEntity,
    file,
    createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    try {
      const newPost = this.postRepository.create({
        user: user,
        title: createPostDto.title,
        image: file.path,
      });

      await this.postRepository.save(newPost);

      return newPost;
    } catch {
      unlinkSync(file.path);
      throw new PostConflictException();
    }
  }

  async getAll(): Promise<PostEntity[]> {
    return await this.postRepository.findAll();
  }

  async getById(id: string): Promise<PostEntity> {
    let post = await this.postRepository.findById(id);
    if (!post) {
      throw new PostNotFoundException();
    }

    post = await this.postRepository.getAndJoin(id);

    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new PostNotFoundException();
    }

    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string): Promise<void> {
    const post = await this.postRepository.findById(id);
    unlinkSync(post.image);
    await this.postRepository.delete(id);
  }

  async getEntityById(id: string): Promise<PostEntity> {
    const product = await this.postRepository.findById(id);

    if (!product) {
      throw new PostEntity();
    }

    return product;
  }
}
