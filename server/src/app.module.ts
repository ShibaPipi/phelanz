import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/filters/exception.filter';
import { IngredientModule } from './module/fit/ingredients/ingredients.module';
import { RecipeModule } from './module/fit/recipes/recipes.module';
import { ConfigModule } from '@nestjs/config';
import { AppModule as SystemAppModule } from './module/system/apps/apps.module';
import { SystemUserModule } from './module/system/users/users.module';
import { SystemMenuModule } from './module/system/menus/menus.module';
import { CmsBannerModule } from './module/cms/banners/banners.module';
import { UploadModule } from './module/file/upload/upload.module';
import { CmsIntroductionModule } from './module/cms/introductions/introductions.module';
import { CmsContentCategoryModule } from './module/cms/content-categories/content-categories.module';
import { CmsContentModule } from './module/cms/contents/contents.module';
import { CmsAboutModule } from './module/cms/abouts/abouts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/',
      },
      {
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads',
      },
    ),
    IngredientModule,
    RecipeModule,
    SystemUserModule,
    SystemAppModule,
    SystemMenuModule,
    CmsBannerModule,
    CmsIntroductionModule,
    CmsContentCategoryModule,
    CmsContentModule,
    CmsAboutModule,
    UploadModule,
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
