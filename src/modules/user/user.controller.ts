import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import type { UpdateResult } from 'typeorm';

import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { ApiFile } from '../../decorators/swagger.decorator';
import { StorageProvider } from '../../providers/storage.provider';
import { UpdateUserDto } from './dtoes/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(public readonly userService: UserService) {}

  @Auth()
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Auth()
  @Get(':id')
  async getSingleUser(@UUIDParam('id') userId: string): Promise<UserEntity> {
    return this.userService.getById(userId);
  }

  @Auth()
  @Put(':id')
  @ApiFile([{ name: 'avatar' }], {
    okResponseData: {
      type: UpdateUserDto,
      description: 'avatar creation',
    },
  })
  @UseInterceptors(
    FileInterceptor('avatar', StorageProvider.avatarUploadFileOptions),
  )
  async updateUser(
    @AuthUser() user,
    @UploadedFile() file,
    @UUIDParam('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    if (user.id === userId) {
      return this.userService.update(userId, updateUserDto, file);
    }

    throw new HttpException(
      'Requested id notable your id',
      HttpStatus.FORBIDDEN,
    );
  }

  @Auth()
  @Delete(':id')
  async deleteUser(
    @AuthUser() user,
    @UUIDParam('id') id: string,
  ): Promise<void> {
    if (id === user.id) {
      return this.userService.delete(id);
    }

    throw new HttpException(
      'Requested id notable your id',
      HttpStatus.FORBIDDEN,
    );
  }
}
