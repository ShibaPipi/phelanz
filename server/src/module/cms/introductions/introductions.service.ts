import { Injectable } from '@nestjs/common';
import { CmsIntroduction, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CmsIntroductionService {
  constructor(private prisma: PrismaService) {}

  async introduction(
    where: Prisma.CmsIntroductionWhereUniqueInput,
  ): Promise<CmsIntroduction | null> {
    return this.prisma.cmsIntroduction.findUnique({
      where,
    });
  }

  async introductions({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CmsIntroductionWhereUniqueInput;
    where?: Prisma.CmsIntroductionWhereInput;
    orderBy: Prisma.CmsIntroductionOrderByWithRelationInput;
  }): Promise<CmsIntroduction[]> {
    return this.prisma.cmsIntroduction.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createIntroduction(
    data: Prisma.CmsIntroductionCreateInput,
  ): Promise<CmsIntroduction> {
    return this.prisma.cmsIntroduction.create({
      data: { ...data, creatorId: 1 },
    }); // TODO: remove hardcode
  }

  async updateIntroduction({
    data,
    where,
  }: {
    where: Prisma.CmsIntroductionWhereUniqueInput;
    data: Prisma.CmsIntroductionUpdateInput;
  }): Promise<CmsIntroduction> {
    return this.prisma.cmsIntroduction.update({ data, where });
  }

  async deleteIntroduction(
    where: Prisma.CmsIntroductionWhereUniqueInput,
  ): Promise<CmsIntroduction> {
    return this.prisma.cmsIntroduction.delete({ where });
  }

  async countIntroductions({
    cursor,
    where,
  }: {
    cursor?: Prisma.CmsIntroductionWhereUniqueInput;
    where?: Prisma.CmsIntroductionWhereInput;
  }): Promise<number> {
    return await this.prisma.cmsIntroduction.count({
      where,
      cursor,
    });
  }
}
