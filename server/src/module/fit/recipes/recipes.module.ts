import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RecipeService } from './recipes.service';
import { RecipeController } from './recipes.controller';

@Module({
  providers: [PrismaService, RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
