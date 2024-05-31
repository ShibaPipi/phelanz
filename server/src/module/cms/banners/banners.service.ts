import { Injectable } from '@nestjs/common';
import { Prisma, Banner } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BannerService {
  constructor(private prisma: PrismaService) {}

  async banner(where: Prisma.BannerWhereUniqueInput): Promise<Banner | null> {
    return this.prisma.banner.findUnique({
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
    cursor?: Prisma.BannerWhereUniqueInput;
    where?: Prisma.BannerWhereInput;
    orderBy: Prisma.BannerOrderByWithRelationInput;
  }): Promise<Banner[]> {
    return this.prisma.banner.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBanner(data: Prisma.BannerCreateInput): Promise<Banner> {
    return this.prisma.banner.create({ data: { ...data, creatorId: 1 } });
  }

  async updateBanner({
    data,
    where,
  }: {
    where: Prisma.BannerWhereUniqueInput;
    data: Prisma.BannerUpdateInput;
  }): Promise<Banner> {
    return this.prisma.banner.update({ data, where });
  }

  async deleteBanner(where: Prisma.BannerWhereUniqueInput): Promise<Banner> {
    return this.prisma.banner.delete({ where });
  }

  async countBanners({
    cursor,
    where,
  }: {
    cursor?: Prisma.BannerWhereUniqueInput;
    where?: Prisma.BannerWhereInput;
  }): Promise<number> {
    return await this.prisma.banner.count({
      where,
      cursor,
    });
  }
}
