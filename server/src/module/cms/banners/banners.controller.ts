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
import { CmsBannerService } from './banners.service';
import { CmsBanner } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';

type StoreData = Omit<CmsBanner, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cms_banners')
export class CmsBannerController {
  constructor(private readonly cmsBannerService: CmsBannerService) {}

  @Post()
  async createBanner(@Body() data: StoreData): Promise<CmsBanner> {
    return this.cmsBannerService.createBanner(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.cmsBannerService.banners>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.cmsBannerService.countBanners(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.cmsBannerService.banners(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<CmsBanner> {
    return this.cmsBannerService.banner({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<CmsBanner> {
    return this.cmsBannerService.updateBanner({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CmsBanner> {
    return this.cmsBannerService.deleteBanner({ id: +id });
  }
}
