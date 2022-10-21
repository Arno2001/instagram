import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
// import { CommentModule } from '../../my-space-backend/a/comment/comment.module';
// import { LikesModule } from './modules/likes/likes.module';
// import { FriendsModule } from './modules/friends/friends.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.typeOrmConfig,
      inject: [ApiConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
