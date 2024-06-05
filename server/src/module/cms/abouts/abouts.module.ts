import { Module } from '@nestjs/common';
import { CmsAboutController } from './abouts.controller';
import { CmsAboutService } from './abouts.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [CmsAboutController],
  providers: [PrismaService, CmsAboutService],
  exports: [],
})
export class CmsAboutModule {}
