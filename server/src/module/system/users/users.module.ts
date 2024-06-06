import { Module } from '@nestjs/common';
import { SystemUserService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { SystemUserController } from './users.controller';

@Module({
  providers: [PrismaService, SystemUserService],
  controllers: [SystemUserController],
})
export class SystemUserModule {}
