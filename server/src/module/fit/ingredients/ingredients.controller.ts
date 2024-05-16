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
import { IngredientService } from './ingredients.service';
import { Ingredient, IngredientType } from '@prisma/client';
import { ListParams } from 'src/common/decorators';
import { RefineSelectOption } from 'src/common/types';
import { Response } from 'express';

@Controller('fit_ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('/types')
  async types(): Promise<RefineSelectOption[]> {
    return Object.values(IngredientType).map((value) => ({
      id: value,
      title: value,
    }));
  }

  @Post()
  async createIngredient(
    @Body() ingredientData: Pick<Ingredient, 'name' | 'type'>,
  ): Promise<Ingredient> {
    return this.ingredientService.createIngredient(ingredientData);
  }

  @Get()
  async all(
    @ListParams()
    listParams: Parameters<typeof this.ingredientService.ingredients>[0],
    @Res() res: Response,
  ): Promise<void> {
    const totalCount =
      await this.ingredientService.countIngredients(listParams);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${totalCount}`);
    res.json(await this.ingredientService.ingredients(listParams));
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientService.ingredient({ id: +id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Pick<Ingredient, 'name' | 'type'>,
  ): Promise<Ingredient> {
    return this.ingredientService.updateIngredient({
      data,
      where: { id: +id },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientService.deleteIngredient({ id: +id });
  }
}
