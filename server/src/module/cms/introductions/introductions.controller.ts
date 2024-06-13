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
import { CmsIntroductionService } from './introductions.service';
import { CmsIntroduction, CmsIntroductionButtonTarget } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';
import { RefineSelectOption } from 'src/common/types';

type StoreData = Omit<CmsIntroduction, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cms_introductions')
export class CmsIntroductionController {
  constructor(
    private readonly cmsIntroductionService: CmsIntroductionService,
  ) {}

  @Get('/buttonTargets')
  async buttonTargets(): Promise<RefineSelectOption[]> {
    return Object.values(CmsIntroductionButtonTarget).map((value) => ({
      id: value,
      title: value,
    }));
  }

  @Post()
  async createIntroduction(@Body() data: StoreData): Promise<CmsIntroduction> {
    return this.cmsIntroductionService.createIntroduction(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.cmsIntroductionService.introductions>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount =
      await this.cmsIntroductionService.countIntroductions(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.cmsIntroductionService.introductions(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<CmsIntroduction> {
    return this.cmsIntroductionService.introduction({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<CmsIntroduction> {
    return this.cmsIntroductionService.updateIntroduction({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CmsIntroduction> {
    return this.cmsIntroductionService.deleteIntroduction({ id: +id });
  }
}
