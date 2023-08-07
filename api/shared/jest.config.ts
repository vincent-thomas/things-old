/* eslint-disable */
export default {
  displayName: 'api-shared',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': '@swc/jest',
  },
  setupFiles: ["<rootDir>/src/setupJest.ts"],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/api/shared',
};
