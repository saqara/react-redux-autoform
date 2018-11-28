module.exports = {
  displayName: 'Jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules'],
  testMatch: [
    '<rootDir>/imports/**/__tests__/**/*.spec.js?(x)',
    '<rootDir>/.jest/__tests__/**/*.spec.js?(x)'
  ],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  }
}
