import { Injectable } from '@nestjs/common';
import { Prisma, SystemUser } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SystemUserService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async systemUser(
    where: Prisma.SystemUserWhereUniqueInput,
  ): Promise<SystemUser | null> {
    return this.prisma.systemUser.findUnique({
      where,
    });
  }

  async systemUsers({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SystemUserWhereUniqueInput;
    where?: Prisma.SystemUserWhereInput;
    orderBy: Prisma.SystemUserOrderByWithRelationInput;
  }): Promise<SystemUser[]> {
    return this.prisma.systemUser.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createSystemUser(
    data: Pick<SystemUser, 'email' | 'name'>,
  ): Promise<SystemUser> {
    return this.prisma.systemUser.create({
      data: {
        ...data,
        password: await bcrypt.hash(
          this.configService.get<string>('INIT_PWD'),
          10,
        ),
      },
    });
  }

  async updateSystemUser({
    data,
    where,
  }: {
    where: Prisma.SystemUserWhereUniqueInput;
    data: Prisma.SystemUserUpdateInput;
  }): Promise<SystemUser> {
    return this.prisma.systemUser.update({ data, where });
  }

  async deleteSystemUser(
    where: Prisma.SystemUserWhereUniqueInput,
  ): Promise<SystemUser> {
    return this.prisma.systemUser.delete({ where });
  }

  async countSystemUsers({
    cursor,
    where,
  }: {
    cursor?: Prisma.SystemUserWhereUniqueInput;
    where?: Prisma.SystemUserWhereInput;
  }): Promise<number> {
    return await this.prisma.systemUser.count({
      where,
      cursor,
    });
  }
}
