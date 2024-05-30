import { Module } from '@nestjs/common';
import { BannerController } from './banners.controller';
import { BannerService } from './banners.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BannerController],
  providers: [PrismaService, BannerService],
})
export class BannerModule {}
