type Query = { query: string; language: 'kuery' };
type Filter = {
  meta?: {
    [k: string]: unknown;
  };
  query: {
    [k: string]: unknown;
  };
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

export type BuildEsQuery = (
  indexPattern: null | undefined,
  queries: Query | Query[],
  filters: Filter | Filter[],
  config: Config,
) => Record<string, unknown>;
