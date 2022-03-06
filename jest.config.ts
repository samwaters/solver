export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10
    }
  },
  moduleNameMapper: {
    "^actions(.*)": "<rootDir>/src/actions$1",
    "^components(.*)": "<rootDir>/src/components$1",
    "^reducers(.*)": "<rootDir>/src/reducers$1",
    "^selectors(.*)": "<rootDir>/src/selectors$1",
    "^theme(.*)": "<rootDir>/src/theme$1",
    "^utils(.*)": "<rootDir>/src/utils$1",
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: [
    "<rootDir>/src/utils/test.utils.ts"
  ],
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
