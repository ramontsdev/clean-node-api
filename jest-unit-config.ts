import jestConfig from './jest.config';

//module.exports = {
//  roots: ['<rootDir>/src'],
//  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
//  collectCoverage: false,
//  coverageDirectory: "coverage",
//  coverageProvider: "v8",
//  preset: '@shelf/jest-mongodb',
//  transform: {
//    '.+\\.ts$': 'ts-jest'
//  },
//  testMatch: ['**/*.spec.ts'],
//  moduleNameMapper: {
//    '@/(.*)': '<rootDir>/src/$1'
//  }
//};

export default {
  ...jestConfig,
  testMatch: ['**/*.spec.ts'],
};
