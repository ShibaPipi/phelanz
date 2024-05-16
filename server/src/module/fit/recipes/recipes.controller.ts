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
import { RecipeService } from './recipes.service';
import { Recipe, RecipeType } from '@prisma/client';
import { CreateBody, ListParams } from 'src/common/decorators';
import { Response } from 'express';
import { RefineSelectOption } from 'src/common/types';
import { relationDifferenceByIds } from 'src/common/utils';

@Controller('fit_recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('/types')
  async types(): Promise<RefineSelectOption[]> {
    return Object.values(RecipeType).map((value) => ({
      id: value,
      title: value,
    }));
  }

  @Post()
  async createRecipe(
    @CreateBody() createBody: Pick<Recipe, 'name' | 'type'>,
  ): Promise<Recipe> {
    return this.recipeService.createRecipe(createBody);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.recipeService.recipes>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount = await this.recipeService.countRecipes(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.recipeService.recipes(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.recipe({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Pick<Recipe, 'name' | 'type'> & { ingredientIds: number[] },
  ): Promise<Recipe> {
    const recipe = await this.recipeService.recipe({ id: +id });
    const connectedIngredientIds = recipe.ingredients.map(({ id }) => id);
    const { ingredientIds, ...restData } = body;
    const { connect, disconnect } = relationDifferenceByIds(
      connectedIngredientIds,
      ingredientIds,
    );

    return this.recipeService.updateRecipe({
      data: {
        ...restData,
        ingredients: {
          disconnect,
          connect,
        },
      },
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.deleteRecipe({ id: +id });
  }
}

/**
 * create
 * */
// const recipe = await prisma.recipe.create({
//   data: {
//     name: '你的食谱名称',
//     type: 'VEGETABLE', // 或者其他你想要的类型
//     ingredients: {
//       connect: [
//         { id: 1 },
//         { id: 2 },
//         // 更多你想要连接的 ingredient 的 id
//       ],
//     },
//   },
// });

/**
 * update
 * */
// const recipe = await prisma.recipe.update({
//   where: { id: 1 }, // 你想要更新的 Recipe 的 id
//   data: {
//     ingredients: {
//       disconnect: [
//         { id: 3 }, // 你想要解绑的 Ingredient 的 id
//       ],
//       connect: [
//         { id: 2 }, // 你想要连接的 Ingredient 的 id
//       ],
//     },
//   },
// });
