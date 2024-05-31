import { Module } from '@nestjs/common';
import { IntroductionController } from './introductions.controller';
import { IntroductionService } from './introductions.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IntroductionController],
  providers: [PrismaService, IntroductionService],
})
export class IntroductionModule {}
