import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',

  // 1) jsdom 시작 전에 실행 → 폴리필 넣기
  setupFiles: ['<rootDir>/jest.polyfills.ts'],

  // 2) 환경 준비 끝난 후 실행 → jest-dom 매처 / MSW 라이프사이클 등
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
