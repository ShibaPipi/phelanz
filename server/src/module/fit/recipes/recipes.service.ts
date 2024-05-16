import { Injectable } from '@nestjs/common';
import { Prisma, Recipe } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  async recipe(where: Prisma.RecipeWhereUniqueInput) {
    return this.prisma.recipe.findUnique({
      where,
      include: {
        ingredients: true,
      },
    });
  }

  async recipes({
    skip,
    take,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RecipeWhereUniqueInput;
    where?: Prisma.RecipeWhereInput;
    orderBy: Prisma.RecipeOrderByWithRelationInput;
  }): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRecipe(data: Prisma.RecipeCreateInput): Promise<Recipe> {
    return this.prisma.recipe.create({ data });
  }

  async updateRecipe({
    data,
    where,
  }: {
    where: Prisma.RecipeWhereUniqueInput;
    data: Prisma.RecipeUpdateInput;
  }): Promise<Recipe> {
    return this.prisma.recipe.update({ data, where });
  }

  async deleteRecipe(where: Prisma.RecipeWhereUniqueInput): Promise<Recipe> {
    return this.prisma.recipe.delete({ where });
  }

  async countRecipes({
    cursor,
    where,
  }: {
    cursor?: Prisma.RecipeWhereUniqueInput;
    where?: Prisma.RecipeWhereInput;
  }): Promise<number> {
    return await this.prisma.recipe.count({
      where,
      cursor,
    });
  }
}
