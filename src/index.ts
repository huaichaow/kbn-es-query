import * as esQuery from '@kbn/es-query';
import { BuildEsQuery } from './kbn-es-query';

const retyped: { buildEsQuery: BuildEsQuery } = esQuery;

export { retyped as kbnEsQuery };

export function buildEsQuery(options: {
  query: string;
  timeFrom: string;
  timeTo: string;
}): ReturnType<BuildEsQuery> {
  const { query, timeFrom, timeTo } = options;

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
              gte: timeFrom,
              lt: timeTo, // e.g., '2023-06-14T10:24:15.061Z',
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
