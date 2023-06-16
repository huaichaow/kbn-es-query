import { BuildEsQuery } from '~/kbn-es-query';

declare module '@kbn/es-query' {
  const buildEsQuery: BuildEsQuery;
}
