import { Module } from '@nestjs/common';
import { CmsContentCategoryController } from './content-categories.controller';
import { CmsContentCategoryService } from './content-categories.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [CmsContentCategoryController],
  providers: [PrismaService, CmsContentCategoryService],
  exports: [],
})
export class CmsContentCategoryModule {}
