import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Indicates the root of your project directory
  rootDir: '.',

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(webp)$': 'jest-transform-stub',
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules', 'src'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/'],

  // An array of regexp pattern strings that are matched against all source file paths before transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  // Indicates whether to use watch mode or not
  watch: false,

  // Indicates whether to use watch mode only to rerun tests related to changed files
  watchAll: false,
};

export default config;
