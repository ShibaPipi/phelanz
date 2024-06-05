import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CreateBody = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const params = { ...request.body };
  const { relations } = request.body;

  if (relations) {
    for (const relation in relations) {
      switch (request.method.toLowerCase()) {
        case 'post':
          // for (const model in relations[relation]) {
          //   params[relation] = {
          //     create: relations[relation][model].map((id: number) => ({
          //       [model]: {
          //         connect: { id },
          //       },
          //     })),
          //   };
          // }
          params[relation] = {
            connect: relations[relation].map((id: number) => ({ id })),
          };
          break;
        default:
          break;
      }
    }

    delete params.relations;
  }

  return params;
});
