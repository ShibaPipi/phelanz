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
import { CmsAboutService } from './abouts.service';
import { CmsAbout, CmsAboutType } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';
import { RefineSelectOption } from 'src/common/types';

type StoreData = Omit<CmsAbout, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cms_abouts')
export class CmsAboutController {
  constructor(private readonly cmsAboutService: CmsAboutService) {}

  @Get('/types')
  async types(): Promise<RefineSelectOption[]> {
    return Object.values(CmsAboutType).map((value) => ({
      id: value,
      title: value,
    }));
  }

  @Post()
  async createCmsAbout(@Body() data: StoreData): Promise<CmsAbout> {
    return this.cmsAboutService.createCmsAbout(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.cmsAboutService.cmsAbouts>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.cmsAboutService.countCmsAbouts(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', String(totalCount));
    res.json(await this.cmsAboutService.cmsAbouts(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<CmsAbout> {
    return this.cmsAboutService.cmsAbout({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<CmsAbout> {
    return this.cmsAboutService.updateCmsAbout({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CmsAbout> {
    return this.cmsAboutService.deleteCmsAbout({ id: +id });
  }
}
