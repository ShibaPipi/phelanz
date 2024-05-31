import { Injectable, OnModuleInit } from '@nestjs/common';
import { Banner, PrismaClient } from '@prisma/client';
import { getImageFullUrl } from './common/utils';
import { result } from 'lodash';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    // add image full url
    this.$use(async (params, next) => {
      const result = await next(params);
      if (
        ['Banner', 'Introduction'].includes(params.model) &&
        params.action === 'findUnique'
      ) {
        result.image_src = getImageFullUrl(result.image);
        return result;
      }
      if (
        ['Banner', 'Introduction'].includes(params.model) &&
        params.action === 'findMany'
      ) {
        return result.map((banner: Banner) => ({
          ...banner,
          image_src: getImageFullUrl(banner.image),
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
