import { Injectable } from '@nestjs/common';

import type { UpsertUserTokenDto } from './dtoes/upsert-user-token.dto';
import { UserTokenFotFoundException } from './exceptions/user-token-fot-found.exception';
import { UserTokenEntity } from './user-token.entity';
import { UserTokenRepository } from './user-token.repository';

@Injectable()
export class UserTokenService {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async upsert(
    upsertUserTokenDto: UpsertUserTokenDto,
  ): Promise<UserTokenEntity> {
    const entity =
      (await this.userTokenRepository.findByUserId(
        upsertUserTokenDto.userId,
      )) || this.userTokenRepository.create(upsertUserTokenDto);

    Object.assign(entity, upsertUserTokenDto);

    return await this.userTokenRepository.save(entity);
  }

  async getById(id: string): Promise<UserTokenEntity> {
    const entity = await this.userTokenRepository.findByUserId(id);

    if (!entity) {
      throw new UserTokenFotFoundException();
    }

    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.userTokenRepository.delete(id);
  }
}
