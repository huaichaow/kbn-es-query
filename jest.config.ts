import { pathsToModuleNameMapper } from 'ts-jest';
import { readFileSync } from 'fs';
import { parse } from 'json5';

const { compilerOptions: { paths } } = parse<{
  compilerOptions: {
    paths: Record<string, string[]>;
  };
}>(readFileSync('./tsconfig.json').toString());

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
};
