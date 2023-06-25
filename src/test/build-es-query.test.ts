// @ts-ignore
import { kbnEsQuery, buildEsQuery } from 'kbn-es-query';

const query = 'name: AccessLog';
const timeFrom = '2023-06-14T10:09:15.061Z';
const timeTo = '2023-06-14T10:24:15.061Z';

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
          'lt': '2023-06-14T10:24:15.061Z'
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
                gte: timeFrom,
                lt: timeTo,
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
      timeFrom,
      timeTo,
    });

    expect(esQuery).toMatchObject(expectedEsQuery);
  });
});
