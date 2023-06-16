// @ts-ignore
import esQuery from 'kbn-es-query';

const q = esQuery.buildEsQuery(
  null,
  {
    query: 'name: AccessLog',
    language: 'kuery',
  },
  [
    {
      meta: {
        index: '51259614-d502-46a4-92a5-461926ec9ec1',
        params: {},
        field: '@timestamp',
      },
      query: {
        range: {
          '@timestamp': {
            format: 'strict_date_optional_time',
            gte: '2023-06-14T10:09:15.061Z',
            lte: '2023-06-14T10:24:15.061Z',
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

console.log(JSON.stringify(q));
