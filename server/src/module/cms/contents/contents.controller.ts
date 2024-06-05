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
import { CmsContentService } from './contents.service';
import { CmsContent, CmsContentStatus } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';
import { RefineSelectOption } from 'src/common/types';

type StoreData = Omit<CmsContent, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cms_contents')
export class CmsContentController {
  constructor(private readonly cmsContentService: CmsContentService) {}

  @Get('/statuses')
  async statuses(): Promise<RefineSelectOption[]> {
    return Object.values(CmsContentStatus).map((value) => ({
      id: value,
      title: value,
    }));
  }

  @Post()
  async createContent(@Body() data: StoreData): Promise<CmsContent> {
    return this.cmsContentService.createCmsContent(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.cmsContentService.cmsContents>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount =
      await this.cmsContentService.countCmsContents(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', String(totalCount));
    res.json(await this.cmsContentService.cmsContents(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<CmsContent> {
    return this.cmsContentService.cmsContent({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<CmsContent> {
    return this.cmsContentService.updateCmsContent({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CmsContent> {
    return this.cmsContentService.deleteCmsContent({ id: +id });
  }
}
