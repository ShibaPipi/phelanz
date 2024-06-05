import { Injectable } from '@nestjs/common';
import { Prisma, CmsContent } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CmsContentService {
  constructor(private prisma: PrismaService) {}

  async content(
    where: Prisma.CmsContentWhereUniqueInput,
  ): Promise<CmsContent | null> {
    return this.prisma.cmsContent.findUnique({
      where,
    });
  }

  async contents({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CmsContentWhereUniqueInput;
    where?: Prisma.CmsContentWhereInput;
    orderBy: Prisma.CmsContentOrderByWithRelationInput;
  }): Promise<CmsContent[]> {
    return this.prisma.cmsContent.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createContent(
    data: Prisma.CmsContentUncheckedCreateInput,
  ): Promise<CmsContent> {
    return this.prisma.cmsContent.create({
      data: { ...data, creatorId: 1 }, // TODO: remove hardcode
    });
  }

  async updateContent({
    data,
    where,
  }: {
    where: Prisma.CmsContentWhereUniqueInput;
    data: Prisma.CmsContentUpdateInput;
  }): Promise<CmsContent> {
    return this.prisma.cmsContent.update({ data, where });
  }

  async deleteContent(
    where: Prisma.CmsContentWhereUniqueInput,
  ): Promise<CmsContent> {
    return this.prisma.cmsContent.delete({ where });
  }

  async countContents({
    cursor,
    where,
  }: {
    cursor?: Prisma.CmsContentWhereUniqueInput;
    where?: Prisma.CmsContentWhereInput;
  }): Promise<number> {
    return await this.prisma.cmsContent.count({
      where,
      cursor,
    });
  }
}
