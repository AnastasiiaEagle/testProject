import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/posts.dto';
import { Posts } from 'generated/prisma';
import { IdDto } from './dto/id.dto';
import type { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/auth/interfaces/jwt.interface';

@Injectable()
export class PostsService {
    private readonly JWT_ACCESS_TOKEN_TTL: string
    private readonly JWT_REFRESH_TOKEN_TTL: string
    private readonly COOKIE_DOMAIN: string

    constructor (private readonly prismaService: PrismaService,
      private readonly configService: ConfigService,
      private readonly jwtService: JwtService,){
                  this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL')
                  this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL')
                  this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN')
              } 

    async create(dto: PostDto): Promise<Posts> {
        const {name, description, date, time, importance, userId} = dto

        const isUser = await this.prismaService.users.findUnique({
        where: {
            id: userId
        }
        })
        if(!isUser){
        throw new NotFoundException('Нічого не знайдено')
        }

        const post = await this.prismaService.posts.create({
        data: {
            name,
            description,
            date,
            time,
            importance,
            user: {
            connect: { id: userId }
            },
        }
        })

        return await post
    }

    async findAll() {
    return await this.prismaService.posts.findMany({
      select:({
        id: true,
        name: true,
        description: true,
        date: true,
        time: true,
        importance: true,
      })
    })
  }

  async findOne(id: string) {
    const post = await this.prismaService.posts.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        description: true,
        date: true,
        time: true,
        importance: true,
      }
    })

    if(!post){
      throw new NotFoundException("Нічого не знайдено")
    } 
    return post
  }

  async findUserPosts(req: Request) {

  const refreshToken = req.cookies['refreshToken'];

  if (!refreshToken || refreshToken === 'refreshToken') {
    throw new UnauthorizedException('Недійсний refresh-токен');
  }
  const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);
  const userId = payload.id;


    const isUser = await this.prismaService.users.findUnique({
        where: {
            id: userId
        }
    })

    if(!isUser){
        throw new NotFoundException("Нічого не знайдено")
    }

    const posts = await this.prismaService.posts.findMany({
        where: {
            userId: userId
        }
    })

    if(!posts){
        throw new NotFoundException("Нічого не знайдено")
    } 

    return posts
  }

   async update(id: string, dto: PostDto) {
    const post = await this.findOne(id)

    if(!post){
        throw new NotFoundException("Такого поста не знайдено")
    }

    await this.prismaService.posts.update({
        where: {
            id
        },
        data: {
            name: dto.name,
            description: dto.description,
            date: dto.date,
            time: dto.time,
            importance: dto.importance
        }
    })

    return "Оновлення пройшло успішно"
  }

   async delete(id: string) {
    const post = await this.findOne(id)

    if(!post){
        throw new NotFoundException("Такого поста не знайдено")
    }

    await this.prismaService.posts.delete({
      where: {
        id
      }
    })

    return "Видалення пройшло успішно"
  }
}
