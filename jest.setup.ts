// 👉 jest-dom 확장 매처 불러오기
// 예: expect(element).toBeInTheDocument()
import '@testing-library/jest-dom'

import { server } from '@/mocks/server'

// 모든 테스트 전에 서버 시작
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// 각 테스트가 끝날 때 핸들러 초기화
afterEach(() => server.resetHandlers())

// 전체 테스트 종료 후 서버 닫기
afterAll(() => server.close())
