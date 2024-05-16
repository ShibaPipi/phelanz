import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ListParams = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { _start, _end } = request.query;

  let params = {
    orderBy: {},
    where: {},
    skip: undefined,
    take: undefined,
    relations: undefined,
  };

  if (_start && _end) {
    const start = parseInt(_start, 10);
    const end = parseInt(_end, 10);
    const skip = start;
    const take = end - start;

    params = { ...params, skip, take };
  }

  for (const key in request.query) {
    if (request.query.hasOwnProperty(key) && key.endsWith('_like')) {
      const field = key.replace('_like', '');
      params.where = {
        ...params.where,
        [field]: { contains: request.query[key] },
      };
    }
  }

  return params;
});
