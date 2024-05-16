import { Injectable } from '@nestjs/common';
import { Ingredient, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async ingredient(
    where: Prisma.IngredientWhereUniqueInput,
  ): Promise<Ingredient | null> {
    return this.prisma.ingredient.findUnique({
      where,
    });
  }

  async ingredients({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IngredientWhereUniqueInput;
    where?: Prisma.IngredientWhereInput;
    orderBy: Prisma.IngredientOrderByWithRelationInput;
  }): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createIngredient(
    data: Prisma.IngredientCreateInput,
  ): Promise<Ingredient> {
    return this.prisma.ingredient.create({ data });
  }

  async updateIngredient({
    data,
    where,
  }: {
    where: Prisma.IngredientWhereUniqueInput;
    data: Prisma.IngredientUpdateInput;
  }): Promise<Ingredient> {
    return this.prisma.ingredient.update({ data, where });
  }

  async deleteIngredient(
    where: Prisma.IngredientWhereUniqueInput,
  ): Promise<Ingredient> {
    return this.prisma.ingredient.delete({ where });
  }

  async countIngredients({
    cursor,
    where,
  }: {
    cursor?: Prisma.IngredientWhereUniqueInput;
    where?: Prisma.IngredientWhereInput;
  }): Promise<number> {
    return await this.prisma.ingredient.count({
      where,
      cursor,
    });
  }
}
