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
import { SystemMenuService } from './menus.service';
import { SystemMenu, SystemMenuStatus, SystemMenuType } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';
import { RefineSelectOption } from 'src/common/types';

type StoreData = Omit<SystemMenu, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('system_menus')
export class SystemMenuController {
  constructor(private readonly menuService: SystemMenuService) {}

  @Get('/types')
  async types(): Promise<RefineSelectOption[]> {
    return Object.values(SystemMenuType).map((value) => ({
      id: value,
      title: value,
    }));
  }

  @Get('/statuses')
  async statuses(): Promise<RefineSelectOption[]> {
    return Object.values(SystemMenuStatus).map((value) => ({
      id: value,
      title: value,
    }));
  }

  @Post()
  async createSystemMenu(@Body() data: StoreData): Promise<SystemMenu> {
    return this.menuService.createSystemMenu(data);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.menuService.menus>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.menuService.countSystemMenus(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(
      await this.menuService.menus({
        ...listParams,
        orderBy: {
          displayOrder: 'asc',
        },
      }),
    );
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<SystemMenu> {
    return this.menuService.menu({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: StoreData,
  ): Promise<SystemMenu> {
    return this.menuService.updateSystemMenu({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SystemMenu> {
    return this.menuService.deleteSystemMenu({ id: +id });
  }
}
