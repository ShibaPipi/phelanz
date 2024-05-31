import { Injectable } from '@nestjs/common';
import { Introduction, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IntroductionService {
  constructor(private prisma: PrismaService) {}

  async introduction(
    where: Prisma.IntroductionWhereUniqueInput,
  ): Promise<Introduction | null> {
    return this.prisma.introduction.findUnique({
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
    cursor?: Prisma.IntroductionWhereUniqueInput;
    where?: Prisma.IntroductionWhereInput;
    orderBy: Prisma.IntroductionOrderByWithRelationInput;
  }): Promise<Introduction[]> {
    return this.prisma.introduction.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createIntroduction(
    data: Prisma.IntroductionCreateInput,
  ): Promise<Introduction> {
    return this.prisma.introduction.create({ data: { ...data, creatorId: 1 } });
  }

  async updateIntroduction({
    data,
    where,
  }: {
    where: Prisma.IntroductionWhereUniqueInput;
    data: Prisma.IntroductionUpdateInput;
  }): Promise<Introduction> {
    return this.prisma.introduction.update({ data, where });
  }

  async deleteIntroduction(
    where: Prisma.IntroductionWhereUniqueInput,
  ): Promise<Introduction> {
    return this.prisma.introduction.delete({ where });
  }

  async countIntroductions({
    cursor,
    where,
  }: {
    cursor?: Prisma.IntroductionWhereUniqueInput;
    where?: Prisma.IntroductionWhereInput;
  }): Promise<number> {
    return await this.prisma.introduction.count({
      where,
      cursor,
    });
  }
}
