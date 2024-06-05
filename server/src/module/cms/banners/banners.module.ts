import { Module } from '@nestjs/common';
import { CmsBannerController } from './banners.controller';
import { CmsBannerService } from './banners.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CmsBannerController],
  providers: [PrismaService, CmsBannerService],
})
export class CmsBannerModule {}
