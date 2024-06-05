import { Injectable, OnModuleInit } from '@nestjs/common';
import { CmsBanner, PrismaClient } from '@prisma/client';
import { getImageFullUrl } from './common/utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    const modelsHasImage = ['Banner', 'Introduction', 'Content'];
    // add image full url
    this.$use(async (params, next) => {
      const result = await next(params);
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
