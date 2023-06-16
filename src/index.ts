import * as esQuery from '@kbn/es-query';
import { BuildEsQuery } from './kbn-es-query';

const retyped: { buildEsQuery: BuildEsQuery } = esQuery;

export default retyped;
