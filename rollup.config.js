const { join } = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const ts = require('@rollup/plugin-typescript');

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'build/index.js',
      format: 'cjs',
    },
    plugins: [
      ts({
        module: 'esnext',
        include: ["src/**/*"],
        exclude: ["src/test/**/*"],
      }),
      commonjs(),
      json(),
      nodeResolve({
        preferBuiltins: true,
        modulePaths: [
          join(__dirname, "deps"),
        ],
        resolveOnly(module) {
          return module.startsWith('@kbn');
        },
      }),
    ],
  },
  {
    input: 'src/test/build-es-query.test.ts',
    output: {
      file: 'build-test/build-es-query.test.js',
      format: 'cjs',
    },
    plugins: [
      ts({
        module: 'esnext',
        compilerOptions: {
          // clear paths to prevent expanding import of 'kbn-es-query' to '@kbn/es-query'
          paths: [],
          outDir: './build-test',
        },
        include: ["src/test/**/*"],
        exclude: ["build/**/*"],
      }),
    ],
  },
];
