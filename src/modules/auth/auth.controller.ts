import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { LoginPayloadDto } from '../../common/modules/auth/login-payload.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtoes/login.dto';
import { RegisterDto } from './dtoes/register.dto';
import { UserEntity } from '../user/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    public readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: LoginPayloadDto, description: 'Successfully login' })
  async login(@Body() loginDto: LoginDto): Promise<LoginPayloadDto> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'Successfully Registered and login',
  })
  async register(@Body() registerDto: RegisterDto): Promise<LoginPayloadDto> {
    return this.authService.registerAndLogin(registerDto);
  }

  @Get('/me')
  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserEntity, description: 'Get Auth User' })
  async me(@AuthUser() user: UserEntity): Promise<UserEntity> {
    return await this.userService.getEntityMeById(user.id);
  }
}
