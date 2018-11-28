module.exports = {
  runner: 'jest-runner-eslint',
  displayName: 'ESLint',
  testPathIgnorePatterns: ['node_modules'],
  testMatch: [
    '**/*?(.spec).js?(x)'
  ]
}
