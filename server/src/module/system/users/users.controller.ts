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
import { UserService } from './users.service';
import { User } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { Response } from 'express';

@Controller('system_users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() userData: Pick<User, 'email' | 'name'>,
  ): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.userService.users>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.userService.countUsers(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.userService.users(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<User> {
    return this.userService.user({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Pick<User, 'email' | 'name'>,
  ): Promise<User> {
    return this.userService.updateUser({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: +id });
  }
}
