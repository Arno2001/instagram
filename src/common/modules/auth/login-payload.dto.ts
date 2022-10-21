import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../modules/user/user.entity';

import { TokenPayloadDto } from './token-payload.dto';

export class LoginPayloadDto {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserEntity, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
