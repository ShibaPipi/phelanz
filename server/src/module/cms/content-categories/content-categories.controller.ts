import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CmsContentCategoryService } from './content-categories.service';
import { CmsContentCategory } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';

type StoreData = Omit<CmsContentCategory, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cms_content_categories')
export class CmsContentCategoryController {
  constructor(
    private readonly cmsContentCategoryService: CmsContentCategoryService,
  ) {}

  @Post()
  async createCategory(@Body() data: StoreData): Promise<CmsContentCategory> {
    return this.cmsContentCategoryService.createContentCategory(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<
      typeof this.cmsContentCategoryService.contentCategories
    >[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount =
      await this.cmsContentCategoryService.countContentCategorys(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', String(totalCount));
    res.json(
      await this.cmsContentCategoryService.contentCategories(listParams),
    );
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<CmsContentCategory> {
    return this.cmsContentCategoryService.contentCategory({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<CmsContentCategory> {
    return this.cmsContentCategoryService.updateContentCategory({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CmsContentCategory> {
    return this.cmsContentCategoryService.deleteContentCategory({ id: +id });
  }
}
