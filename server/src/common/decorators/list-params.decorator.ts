import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { parseFieldAndCondition, parseValue } from '../utils';

/**
 * Parses the query parameters from the request to construct a Prisma-compatible query object.
 *
 * Supported query parameters:
 *
 * - id=1: Translates to `WHERE id = 1`.
 * - title=example: Translates to `WHERE title = 'example'`.
 * - like[title]=example: Translates to `WHERE title LIKE '%example%'`.
 * - or[0][status]=PUBLISHED&or[1][status]=DRAFT: Translates to `OR (status = 'PUBLISHED' OR status = 'DRAFT')`.
 * - or[2][like][title]=example: Translates to `OR (title LIKE '%example%')`.
 * - _start=0 and _end=10: Used for pagination, retrieves records from index 0 to 10.
 *
 * @returns {Object} An object containing `where`, `skip`, and `take` properties for Prisma queries.
 */
export const ListParams = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const where = {};
  const orConditions = [];
  let skip: number | undefined = undefined;
  let take: number | undefined = undefined;

  const { _start, _end, ...restQueries } = request.query;

  if (_start && _end) {
    skip = parseInt(_start, 10);
    take = parseInt(_end, 10) - skip;
  }

  for (const key in restQueries) {
    if (restQueries.hasOwnProperty(key)) {
      const value = restQueries[key];

      if (key.startsWith('or')) {
        const orIndex = key.match(/or\[(\d+)\]\[(\w+)\]/);
        if (orIndex) {
          const [, index, field] = orIndex;
          if (!orConditions[Number(index)]) {
            orConditions[Number(index)] = {};
          }
          const [parsedField, condition] = parseFieldAndCondition(field);
          if (condition === 'like') {
            orConditions[Number(index)][parsedField] = { contains: value };
          } else {
            orConditions[Number(index)][parsedField] = parseValue(value);
          }
        }
      } else if (key.startsWith('like')) {
        // 处理 LIKE 条件
        const likeField = key.match(/like\[(\w+)\]/);
        if (likeField) {
          const [, field] = likeField;
          where[field] = { contains: value };
        }
      } else {
        // 处理 AND 条件
        const [field, condition] = parseFieldAndCondition(key);
        if (condition === 'like') {
          where[field] = { contains: value };
        } else {
          where[field] = parseValue(value);
        }
      }
    }
  }

  return { where, skip, take };
});
