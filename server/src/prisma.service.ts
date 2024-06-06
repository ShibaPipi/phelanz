import { Injectable, OnModuleInit } from '@nestjs/common';
import { CmsBanner, PrismaClient } from '@prisma/client';
import { getImageFullUrl } from './common/utils';
import { map, omit } from 'lodash';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    const modelsHasImage = [
      'CmsBanner',
      'CmsIntroduction',
      'CmsContent',
      'CmsAbout',
    ];
    this.$use(async (params, next) => {
      const result = await next(params);

      // add image full url
      if (
        modelsHasImage.includes(params.model) &&
        params.action === 'findUnique'
      ) {
        result.image_src = result.image ? getImageFullUrl(result.image) : null;
        return result;
      }
      if (
        modelsHasImage.includes(params.model) &&
        params.action === 'findMany'
      ) {
        return result.map((banner: CmsBanner) => ({
          ...banner,
          image_src: banner.image ? getImageFullUrl(banner.image) : null,
        }));
      }

      // omit user password
      if (params.model === 'SystemUser' && params.action === 'findUnique') {
        delete result.password;
        return result;
      }
      if (params.model === 'SystemUser' && params.action === 'findMany') {
        return map(result, (item) => omit(item, ['password']));
      }

      return result;
    });
    // this.$extends({
    //   result: {
    //     banner: {
    //       image_src: {
    //         needs: { image: true },
    //         compute: ({ image }) => getImageFullUrl(image)
    //       },
    //     },
    //   },
    //   query: {
    //     banner: {
    //       async findUnique({ args, query }) {
    //         const result = await query(args);
    //         return {
    //           ...result,
    //           image_src: getImageFullUrl(result.image),
    //         };
    //       },
    //       async findMany({ args, query }) {
    //         const results = await query(args);
    //         return results.map((banner) => ({
    //           ...banner,
    //           image_src: getImageFullUrl(banner.image),
    //         }));
    //       },
    //     },
    //   },
    // });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
