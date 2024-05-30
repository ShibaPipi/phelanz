import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/system/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/filters/exception.filter';
import { IngredientModule } from './module/fit/ingredients/ingredients.module';
import { RecipeModule } from './module/fit/recipes/recipes.module';
import { ConfigModule } from '@nestjs/config';
import { AppModule as SystemAppModule } from './module/system/apps/apps.module';
import { SystemMenuModule } from './module/system/menus/menus.module';
import { BannerModule } from './module/cms/banners/banners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    IngredientModule,
    RecipeModule,
    SystemAppModule,
    SystemMenuModule,
    BannerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
