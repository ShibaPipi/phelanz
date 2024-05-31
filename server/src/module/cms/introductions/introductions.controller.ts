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
import { IntroductionService } from './introductions.service';
import { Introduction } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';

type StoreData = Omit<Introduction, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cms_introductions')
export class IntroductionController {
  constructor(private readonly introductionService: IntroductionService) {}

  @Post()
  async createIntroduction(@Body() data: StoreData): Promise<Introduction> {
    return this.introductionService.createIntroduction(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.introductionService.introductions>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount =
      await this.introductionService.countIntroductions(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.introductionService.introductions(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Introduction> {
    return this.introductionService.introduction({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<Introduction> {
    return this.introductionService.updateIntroduction({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Introduction> {
    return this.introductionService.deleteIntroduction({ id: +id });
  }
}
