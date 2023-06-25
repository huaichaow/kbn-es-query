import * as esQuery from '@kbn/es-query';
import { BuildEsQuery } from './kbn-es-query';

const retyped: { buildEsQuery: BuildEsQuery } = esQuery;

export { retyped as kbnEsQuery };

export function buildEsQuery(options: {
  query: string;
  startTime: string;
  endTime: string;
}): ReturnType<BuildEsQuery> {
  const { query, startTime, endTime } = options;

  return retyped.buildEsQuery(
    null,
    {
      query,
      language: 'kuery',
    },
    [
      {
        meta: {
          params: {},
          field: '@timestamp',
        },
        query: {
          range: {
            '@timestamp': {
              format: 'strict_date_optional_time',
              gte: startTime,
              lt: endTime, // e.g., '2023-06-14T10:24:15.061Z',
            },
          },
        },
      },
    ],
    {
      allowLeadingWildcards: true,
      queryStringOptions: {
        analyze_wildcard: true,
      },
      ignoreFilterIfFieldNotInIndex: false,
      dateFormatTZ: 'UTC',
      filtersInMustClause: false,
    },
  );
}
