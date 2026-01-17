module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '**/*.ts',
    '!node_modules/**',
    '!coverage/**',
    '!dist/**',
    '!reports/**',
    '!**/*.spec.js',
    '!**/*.spec.ts',
    '!jest.config.js',
    '!prettier.config.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  testMatch: ['**/*.spec.js', '**/*.spec.ts'],
};
