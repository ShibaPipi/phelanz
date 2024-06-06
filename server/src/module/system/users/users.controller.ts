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
import { SystemUserService } from './users.service';
import { SystemUser } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';

type StoreData = Pick<SystemUser, 'email' | 'name'>;

@Controller('system_users')
export class SystemUserController {
  constructor(private readonly userService: SystemUserService) {}

  @Post()
  async createSystemUser(@Body() userData: StoreData) {
    return !!this.userService.createSystemUser(userData);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.userService.systemUsers>[0],
    @Res() res: Response,
  ) {
    const totalCount = await this.userService.countSystemUsers(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.userService.systemUsers(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.userService.systemUser({ id: +id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: StoreData) {
    return this.userService.updateSystemUser({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteSystemUser({ id: +id });
  }
}
