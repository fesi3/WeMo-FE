import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  collectCoverage: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(config);
