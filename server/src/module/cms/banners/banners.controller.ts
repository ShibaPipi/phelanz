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
import { BannerService } from './banners.service';
import { Banner } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';

type StoreData = Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cms_banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  async createBanner(@Body() data: StoreData): Promise<Banner> {
    return this.bannerService.createBanner(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.bannerService.banners>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.bannerService.countBanners(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.bannerService.banners(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.banner({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<Banner> {
    return this.bannerService.updateBanner({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.deleteBanner({ id: +id });
  }
}
