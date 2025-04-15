import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor (private prisma: PrismaService) {}
  create(createArticleDto: CreateArticleDto, userId: number) {
    console.log('create called', createArticleDto);
    console.log('userId', userId);
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        authorId: userId,
      }
  });
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    })
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    // console.log('update called', id, updateArticleDto);
    const result= this.prisma.article.findUnique({
      where: { id }, 
    });

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({where: { id }});
  }
}
