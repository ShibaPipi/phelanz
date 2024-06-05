import { Injectable } from '@nestjs/common';
import { Prisma, CmsContentCategory } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CmsContentCategoryService {
  constructor(private prisma: PrismaService) {}

  async contentCategory(
    where: Prisma.CmsContentCategoryWhereUniqueInput,
  ): Promise<CmsContentCategory | null> {
    return this.prisma.cmsContentCategory.findUnique({
      where,
    });
  }

  async contentCategories({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CmsContentCategoryWhereUniqueInput;
    where?: Prisma.CmsContentCategoryWhereInput;
    orderBy: Prisma.CmsContentCategoryOrderByWithRelationInput;
  }): Promise<CmsContentCategory[]> {
    return this.prisma.cmsContentCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createContentCategory(
    data: Prisma.CmsContentCategoryCreateInput,
  ): Promise<CmsContentCategory> {
    return this.prisma.cmsContentCategory.create({
      data: { ...data, creatorId: 1 }, // TODO: remove hardcode
    });
  }

  async updateContentCategory({
    data,
    where,
  }: {
    where: Prisma.CmsContentCategoryWhereUniqueInput;
    data: Prisma.CmsContentCategoryUpdateInput;
  }): Promise<CmsContentCategory> {
    return this.prisma.cmsContentCategory.update({ data, where });
  }

  async deleteContentCategory(
    where: Prisma.CmsContentCategoryWhereUniqueInput,
  ): Promise<CmsContentCategory> {
    return this.prisma.cmsContentCategory.delete({ where });
  }

  async countContentCategorys({
    cursor,
    where,
  }: {
    cursor?: Prisma.CmsContentCategoryWhereUniqueInput;
    where?: Prisma.CmsContentCategoryWhereInput;
  }): Promise<number> {
    return await this.prisma.cmsContentCategory.count({
      where,
      cursor,
    });
  }
}
