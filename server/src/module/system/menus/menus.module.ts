import { PrismaService } from '../../../prisma.service';
import { Module } from '@nestjs/common';
import { SystemMenuController } from './menus.controller';
import { SystemMenuService } from './menus.service';

@Module({
  controllers: [SystemMenuController],
  providers: [PrismaService, SystemMenuService],
})
export class SystemMenuModule {}
