import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports:[
      JwtModule.registerAsync({
        imports: [ConfigModule, PrismaModule],
        useFactory: getJwtConfig,
        inject: [ConfigService],
      })
    ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
