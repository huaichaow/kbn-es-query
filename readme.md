# @kbn/query

KQL is transformed to ElasticSearch Query by the `es-query` module used in 
`kibana` **v8.9.0**. but no such package in npm or other registries. So create 
this repo to build them from the source code.

it includes 3 steps:

1. build the package from `elastic/kibana` source code
2. copy only `es-query` and packages it depends on to this repo
3. setup necessary config, e.g., the main entry

## build from `elastic/kibana` source code

1. download kibana source code, repo https://github.com/elastic/kibana
2. build, run `yarn kbn bootstrap` and `yarn build`
   > update `src/dev/build/build_distributables.ts` to stop before
   > `if (options.createPlatformFolders)` with a `throw` statement, 
   > otherwise the sub packages will be removed by later tasks.

Now we got all the sub packages transformed/compiled in folder
`build/kibana/node_modules/@kbn`, and all we need is the below 2 packages:
* `es-query` and
* `i18n` - used by `es-query`

## config this repo

1. install deps used by the above 2 packages:
   * lodash
   * moment
   * moment-timezone
   * intl-format-cache@2.1.0, please use the exact version as in 'elastic/kibana' package.json
   * intl-messageformat@2.2.0
   * intl-relativeformat@2.1.0

2. copy the 2 packages to `deps`, and add it to `NODE_PATH` env variable with 
`cross-env` before running command.

3. re-export it
