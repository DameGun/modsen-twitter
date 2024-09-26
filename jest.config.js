/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  rootDir: './src',

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testMatch: ['**/__tests__/(entities|shared)/**/*.(ts|tsx|js|jsx)'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
    '.+\\.(png|jpg|ttf|svg)$': 'jest-transform-stub',
  },

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
