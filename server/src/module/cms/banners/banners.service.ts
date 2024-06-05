import { Injectable } from '@nestjs/common';
import { Prisma, CmsBanner } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CmsBannerService {
  constructor(private prisma: PrismaService) {}

  async banner(
    where: Prisma.CmsBannerWhereUniqueInput,
  ): Promise<CmsBanner | null> {
    return this.prisma.cmsBanner.findUnique({
      where,
    });
  }

  async banners({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CmsBannerWhereUniqueInput;
    where?: Prisma.CmsBannerWhereInput;
    orderBy: Prisma.CmsBannerOrderByWithRelationInput;
  }): Promise<CmsBanner[]> {
    return this.prisma.cmsBanner.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBanner(data: Prisma.CmsBannerCreateInput): Promise<CmsBanner> {
    return this.prisma.cmsBanner.create({ data: { ...data, creatorId: 1 } }); // TODO: remove hardcode
  }

  async updateBanner({
    data,
    where,
  }: {
    where: Prisma.CmsBannerWhereUniqueInput;
    data: Prisma.CmsBannerUpdateInput;
  }): Promise<CmsBanner> {
    return this.prisma.cmsBanner.update({ data, where });
  }

  async deleteBanner(
    where: Prisma.CmsBannerWhereUniqueInput,
  ): Promise<CmsBanner> {
    return this.prisma.cmsBanner.delete({ where });
  }

  async countBanners({
    cursor,
    where,
  }: {
    cursor?: Prisma.CmsBannerWhereUniqueInput;
    where?: Prisma.CmsBannerWhereInput;
  }): Promise<number> {
    return await this.prisma.cmsBanner.count({
      where,
      cursor,
    });
  }
}
