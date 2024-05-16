import { Injectable } from '@nestjs/common';
import { Prisma, App } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async app(where: Prisma.AppWhereUniqueInput): Promise<App | null> {
    return this.prisma.app.findUnique({
      where,
    });
  }

  async apps({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppWhereUniqueInput;
    where?: Prisma.AppWhereInput;
    orderBy: Prisma.AppOrderByWithRelationInput;
  }): Promise<App[]> {
    return this.prisma.app.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createApp(data: Prisma.AppCreateInput): Promise<App> {
    return this.prisma.app.create({ data });
  }

  async updateApp({
    data,
    where,
  }: {
    where: Prisma.AppWhereUniqueInput;
    data: Prisma.AppUpdateInput;
  }): Promise<App> {
    return this.prisma.app.update({ data, where });
  }

  async deleteApp(where: Prisma.AppWhereUniqueInput): Promise<App> {
    return this.prisma.app.delete({ where });
  }

  async countApps({
    cursor,
    where,
  }: {
    cursor?: Prisma.AppWhereUniqueInput;
    where?: Prisma.AppWhereInput;
  }): Promise<number> {
    return await this.prisma.app.count({
      where,
      cursor,
    });
  }
}
