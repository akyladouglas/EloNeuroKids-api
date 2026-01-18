module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@dtos/(.*)$': '<rootDir>/src/application/dtos/$1',
    '^@entities/(.*)$': '<rootDir>/src/domain/entities/$1',
    // Mapeia o uuid para o nosso Mock Global
    '^uuid$': '<rootDir>/test/mocks/uuid.mock.ts',
  },
  modulePaths: ['<rootDir>'],
};
