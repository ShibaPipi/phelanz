import { Module } from '@nestjs/common';
import { CmsIntroductionController } from './introductions.controller';
import { CmsIntroductionService } from './introductions.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CmsIntroductionController],
  providers: [PrismaService, CmsIntroductionService],
})
export class CmsIntroductionModule {}
