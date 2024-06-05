import { Module } from '@nestjs/common';
import { CmsContentController } from './contents.controller';
import { CmsContentService } from './contents.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [CmsContentController],
  providers: [PrismaService, CmsContentService],
  exports: [],
})
export class CmsContentModule {}
