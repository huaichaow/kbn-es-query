declare module '@kbn/es-query';

type Query = { query: string; language: 'kuery' };
type Filter = {
  meta: {
    index: string;
    [k: string]: unknown;
  },
  [k: string]: unknown;
};
type Config = {
  allowLeadingWildcards: boolean,
  queryStringOptions: {
    analyze_wildcard: boolean;
  },
  ignoreFilterIfFieldNotInIndex: boolean;
  dateFormatTZ: 'UTC';
  filtersInMustClause: boolean,
  nestedIgnoreUnmapped?: boolean;
  caseInsensitive?: boolean;
};

declare module '@kbn/es-query' {
  function buildEsQuery(
    indexPattern: null | undefined,
    queries: Query | Query[],
    filters: Filter | Filter[],
    config: Config,
  );
}

