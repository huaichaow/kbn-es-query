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

export type x = (
  indexPattern: null | undefined,
  queries: Query | Query[],
  filters: Filter | Filter[],
  config: Config,
)=> unknown;

export type BuildEsQuery = (
  indexPattern: null | undefined,
  queries: Query | Query[],
  filters: Filter | Filter[],
  config: Config,
) => unknown;
