import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGenerateJWTOptions } from 'src/common/interfaces/IGenerateJWTOptions';
import { LoginPayloadDto } from 'src/common/modules/auth/login-payload.dto';
import { TokenPayloadDto } from 'src/common/modules/auth/token-payload.dto';

import { TokenTypeEnum } from '../../constants/token-type.enum';
import { UtilsProvider } from '../../providers/utils.provider';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import type { LoginDto } from './dtoes/login.dto';
import type { RegisterDto } from './dtoes/register.dto';
import { UserUnauthenticatedException } from './exceptions/user-unauthenticated.exception';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
  ) {}

  async generateToken(options: IGenerateJWTOptions): Promise<TokenPayloadDto> {
    return options.expiresIn
      ? {
          expiresIn: options.expiresIn,
          token: await this.jwtService.signAsync(options.payload, {
            expiresIn: options.expiresIn,
          }),
        }
      : {
          expiresIn: options.expiresIn,
          token: await this.jwtService.signAsync(options.payload),
        };
  }

  async validateUser(loginDto: LoginDto): Promise<UserEntity> {
    const userEntity = await this.userService.getEntityByUserName(
      loginDto.userName,
    );
    const isPasswordValid = await UtilsProvider.validateHash(
      loginDto.password,
      userEntity.password,
    );

    if (!isPasswordValid) {
      const description = 'password is an invalid';

      throw new UserUnauthenticatedException(description);
    }

    return userEntity;
  }

  async login(userInfo: LoginDto | UserEntity): Promise<LoginPayloadDto> {
    const userEntity =
      userInfo instanceof UserEntity
        ? userInfo
        : await this.validateUser(userInfo);

    const token = await this.generateToken({
      payload: { id: userEntity.id, type: TokenTypeEnum.AUTH },
      expiresIn: this.configService.authConfig.jwtExpirationTime,
    });
    const user = userEntity;

    return { user, token };
  }

  async registerAndLogin(registerDto: RegisterDto): Promise<LoginPayloadDto> {
    let userEntity: UserEntity;

    try {
      userEntity = await this.userService.create(registerDto);
    } catch (error) {
      throw new UserUnauthenticatedException('error');
    }

    return this.login(userEntity);
  }
}
