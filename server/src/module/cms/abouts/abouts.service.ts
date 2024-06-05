import { Injectable } from '@nestjs/common';
import { Prisma, CmsAbout } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CmsAboutService {
  constructor(private prisma: PrismaService) {}

  async cmsAbout(
    where: Prisma.CmsAboutWhereUniqueInput,
  ): Promise<CmsAbout | null> {
    return this.prisma.cmsAbout.findUnique({
      where,
    });
  }

  async cmsAbouts({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CmsAboutWhereUniqueInput;
    where?: Prisma.CmsAboutWhereInput;
    orderBy: Prisma.CmsAboutOrderByWithRelationInput;
  }): Promise<CmsAbout[]> {
    return this.prisma.cmsAbout.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCmsAbout(data: Prisma.CmsAboutCreateInput): Promise<CmsAbout> {
    return this.prisma.cmsAbout.create({ data: { ...data, creatorId: 1 } }); // TODO: remove hardcode
  }

  async updateCmsAbout({
    data,
    where,
  }: {
    where: Prisma.CmsAboutWhereUniqueInput;
    data: Prisma.CmsAboutUpdateInput;
  }): Promise<CmsAbout> {
    return this.prisma.cmsAbout.update({ data, where });
  }

  async deleteCmsAbout(
    where: Prisma.CmsAboutWhereUniqueInput,
  ): Promise<CmsAbout> {
    return this.prisma.cmsAbout.delete({ where });
  }

  async countCmsAbouts({
    cursor,
    where,
  }: {
    cursor?: Prisma.CmsAboutWhereUniqueInput;
    where?: Prisma.CmsAboutWhereInput;
  }): Promise<number> {
    return await this.prisma.cmsAbout.count({
      where,
      cursor,
    });
  }
}
