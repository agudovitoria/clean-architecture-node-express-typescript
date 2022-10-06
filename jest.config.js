module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "types\\.ts",
    ".+\\.d\\.ts"
  ],
  moduleFileExtensions: ["ts", "js"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: 'node',
  roots: ["<rootDir>/test/"],
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true
};