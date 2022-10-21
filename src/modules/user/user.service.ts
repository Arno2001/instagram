import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import type { UpdateResult } from 'typeorm';

import { UtilsProvider } from '../../providers/utils.provider';
import type { CreateUserDto } from './dtoes/create-user.dto';
import type { UpdateUserDto } from './dtoes/update-user.dto';
import { UserCredientalException } from './exception/user-crediential.exception';
import { UserNotFoundException } from './exception/user-not-found.exception';
import type { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = await UtilsProvider.generateHash(
      createUserDto.password,
    );

    const userEntity = this.userRepository.create(createUserDto);

    return this.userRepository.save(userEntity);
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAllUser();
  }

  async getById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file,
  ): Promise<UpdateResult> {
    const user = await this.getById(id);

    if (user.avatar) {
      unlinkSync(user.avatar);
    }

    const avatar = file ? file.path : user.avatar;

    return this.userRepository
      .update(id, {
        ...updateUserDto,
        avatar,
      })
      .catch((error: string) => {
        unlinkSync(avatar);
        throw new UserCredientalException(error);
      });
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getEntityById(userId: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findById(userId);

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async getEntityMeById(userId: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findAndJoin(userId);

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }

  async getEntityByUserName(userName: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.getEntityByUserName(userName);

    if (!userEntity) {
      throw new UserNotFoundException();
    }

    return userEntity;
  }
}