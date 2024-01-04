/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from 'jest';

const config: Config = {
  globals: {},
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '^account/(.*)$': '<rootDir>/src/account/$1',
    '^adapter/(.*)$': '<rootDir>/src/adapter/$1',
    '^common/(.*)$': '<rootDir>/src/common/$1',
    '^spec/(.*)$': '<rootDir>/src/spec/$1',
  },
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
