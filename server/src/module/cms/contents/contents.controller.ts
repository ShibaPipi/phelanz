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
    return this.cmsContentService.createContent(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.cmsContentService.contents>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.cmsContentService.countContents(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', String(totalCount));
    res.json(await this.cmsContentService.contents(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<CmsContent> {
    return this.cmsContentService.content({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<CmsContent> {
    return this.cmsContentService.updateContent({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CmsContent> {
    return this.cmsContentService.deleteContent({ id: +id });
  }
}
