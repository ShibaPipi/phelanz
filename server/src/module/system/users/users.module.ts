import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './users.controller';

@Module({
  providers: [PrismaService, UserService],
  controllers: [UserController],
})
export class UserModule {}
