import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUser } from '../../decorators/auth-user.decorator';
import type { UpdateResult } from 'typeorm';

import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { ApiFile } from '../../decorators/swagger.decorator';
import { StorageProvider } from '../../providers/storage.provider';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { UserEntity } from '../user/user.entity';
import { LikedUserService } from './liked-user.service';

@Controller('posts')
@ApiTags('posts')
export class PostController {
  constructor(
    public readonly postService: PostService,
    public readonly commentService: CommentService,
    public readonly likedUserService: LikedUserService,
  ) {}

  @Post()
  @Auth()
  @ApiFile([{ name: 'image', isArray: false }], {
    isRequired: true,
    okResponseData: {
      type: PostEntity,
      description: 'product creation',
    },
  })
  @UseInterceptors(
    FileInterceptor('image', StorageProvider.postImageUploadFileOptions),
  )
  @ApiCreatedResponse({
    description: 'Your request of Post is successfully done.',
  })
  @ApiForbiddenResponse({ description: 'Post data does not match' })
  async createProduct(
    @AuthUser() user: UserEntity,
    @UploadedFile() file,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postService.create(user, file, createPostDto);
  }

  @Get()
  @Auth()
  @ApiOkResponse({
    description: 'You have successfully received the Posts.',
  })
  @ApiNotFoundResponse({
    description: 'Posts not found.',
  })
  async getAll(): Promise<PostEntity[]> {
    return this.postService.getAll();
  }

  // @Get('/search')
  // @ApiOkResponse({ description: 'You have successfully received the Product.' })
  // @ApiBadRequestResponse({ description: 'The Product does not exist.' })
  // async getSearchProducts(
  //   @Query() searchProductsDto: SearchProductsDto,
  // ): Promise<PageDto<ProductDto>> {
  //   return this.postService.getProducts(searchProductsDto);
  // }

  @Get(':id')
  @Auth()
  @ApiOkResponse({ description: 'You have successfully received the Post.' })
  @ApiBadRequestResponse({ description: 'The Post does not exist.' })
  async getOne(@UUIDParam('id') id: string): Promise<PostEntity> {
    return this.postService.getById(id);
  }

  @Put(':id')
  @Auth()
  @ApiOkResponse({ description: 'Post successfully updated.' })
  @ApiBadRequestResponse({ description: 'The Post does not exist.' })
  async update(
    @Body() updatePostDto: UpdatePostDto,
    @UUIDParam('id') id: string,
  ): Promise<UpdateResult> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @Auth()
  @ApiOkResponse({ description: 'Post successfully deleted.' })
  @ApiBadRequestResponse({ description: 'The Post does not exist.' })
  async remove(@UUIDParam('id') id: string): Promise<void> {
    return this.postService.remove(id);
  }

  @Post(':postId/comments')
  @Auth()
  @ApiCreatedResponse({ description: 'Post successfully commented' })
  @ApiBadRequestResponse({ description: 'Post Id does not match ' })
  async createComment(
    @AuthUser() user,
    @UUIDParam('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.postComment(user, postId, createCommentDto);
  }

  @Delete(':postId/:commentId')
  @Auth()
  @ApiOkResponse({
    description: 'Request for delete comment successfully complete',
  })
  @ApiBadRequestResponse({ description: 'Post OR Comment does not exist ' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized User.' })
  async removeComment(
    @UUIDParam('postId') postId: string,
    @UUIDParam('commentId') commentId: string,
  ) {
    return this.commentService.removeComment(postId, commentId);
  }

  @Post(':postId/like')
  @Auth()
  @ApiCreatedResponse({ description: 'Post successfully commented' })
  @ApiBadRequestResponse({ description: 'Post Id does not match ' })
  async likePost(
    @AuthUser() user: UserEntity,
    @UUIDParam('postId') postId: string,
  ) {
    return this.likedUserService.likePost(user, postId);
  }
}
