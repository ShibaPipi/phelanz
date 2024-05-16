import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IngredientService } from './ingredients.service';
import { IngredientController } from './ingredients.controller';

@Module({
  providers: [PrismaService, IngredientService],
  controllers: [IngredientController],
})
export class IngredientModule {}
