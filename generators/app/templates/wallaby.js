module.exports = wallaby => ({
  files: ['src/**/*.js*', '!src/**/__tests__/*.js*'],
  tests: ['src/**/__tests__/*.js*'],
  compilers: {
    'src/**/*.js*': wallaby.compilers.babel(),
  },
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  setup: (wlby) => {
    wlby.testFramework.configure({
      moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
      },
    });
  },
});
