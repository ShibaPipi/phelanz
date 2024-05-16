import { Module } from '@nestjs/common';
import { AppController } from './apps.controller';
import { AppService } from './apps.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
