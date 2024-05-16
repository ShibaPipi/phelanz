import { Injectable } from '@nestjs/common';
import { Prisma, SystemMenu } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SystemMenuService {
  constructor(private prisma: PrismaService) {}

  async menu(
    where: Prisma.SystemMenuWhereUniqueInput,
  ): Promise<SystemMenu | null> {
    return this.prisma.systemMenu.findUnique({
      where,
    });
  }

  async menus({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SystemMenuWhereUniqueInput;
    where?: Prisma.SystemMenuWhereInput;
    orderBy: Prisma.SystemMenuOrderByWithRelationInput;
  }): Promise<SystemMenu[]> {
    return this.prisma.systemMenu.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSystemMenu(
    data: Prisma.SystemMenuCreateInput,
  ): Promise<SystemMenu> {
    return this.prisma.systemMenu.create({
      data: {
        ...data,
        creatorId: 1,
      },
    });
  }

  async updateSystemMenu({
    data,
    where,
  }: {
    where: Prisma.SystemMenuWhereUniqueInput;
    data: Prisma.SystemMenuUpdateInput;
  }): Promise<SystemMenu> {
    return this.prisma.systemMenu.update({ data, where });
  }

  async deleteSystemMenu(
    where: Prisma.SystemMenuWhereUniqueInput,
  ): Promise<SystemMenu> {
    return this.prisma.systemMenu.delete({ where });
  }

  async countSystemMenus({
    cursor,
    where,
  }: {
    cursor?: Prisma.SystemMenuWhereUniqueInput;
    where?: Prisma.SystemMenuWhereInput;
  }): Promise<number> {
    return await this.prisma.systemMenu.count({
      where,
      cursor,
    });
  }
}
