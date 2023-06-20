// @ts-ignore
import { kbnEsQuery, buildEsQuery } from 'kbn-es-query';

const query = 'name: AccessLog';
const startTime = '2023-06-14T10:09:15.061Z';
const endTime = '2023-06-14T10:24:15.061Z';

const expectedEsQuery = {
  'bool': {
    'must': [],
    'filter': [{
      'bool': {
        'should': [{ 'match': { 'name': 'AccessLog' } }],
        'minimum_should_match': 1
      }
    }, {
      'range': {
        '@timestamp': {
          'format': 'strict_date_optional_time',
          'gte': '2023-06-14T10:09:15.061Z',
          'lte': '2023-06-14T10:24:15.061Z'
        }
      }
    }],
    'should': [],
    'must_not': []
  }
};

describe('buildEsQuery', () => {
  it('should generate ES query with lib', () => {
    const esQuery = kbnEsQuery.buildEsQuery(
      null,
      {
        query,
        language: 'kuery',
      },
      [
        {
          query: {
            range: {
              '@timestamp': {
                format: 'strict_date_optional_time',
                gte: startTime,
                lte: endTime,
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

    expect(esQuery).toMatchObject(expectedEsQuery);
  });

  it('should generate ES query with simplified function', () => {
    const esQuery = buildEsQuery({
      query,
      startTime,
      endTime,
    });

    expect(esQuery).toMatchObject(expectedEsQuery);
  });
});
