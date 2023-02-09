export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/presentation/protocols/**',
    '!<rootDir>/src/presentation/controllers/sign-up/sign-up-protocols.ts',
    '!<rootDir>/src/data/protocols/**',
    '!<rootDir>/src/data/use-cases/add-account/db-add-account-protocols.ts',
    '!<rootDir>/src/domain/**',
  ],
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
