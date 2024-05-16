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
import { AppService } from './apps.service';
import { App } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';

@Controller('system_apps')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createApp(
    @Body() appData: Pick<App, 'name' | 'description'>,
  ): Promise<App> {
    return this.appService.createApp(appData);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.appService.apps>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.appService.countApps(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.appService.apps(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<App> {
    return this.appService.app({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Pick<App, 'name' | 'description'>,
  ): Promise<App> {
    return this.appService.updateApp({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<App> {
    return this.appService.deleteApp({ id: +id });
  }
}
