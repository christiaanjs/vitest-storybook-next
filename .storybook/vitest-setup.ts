import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { setupWorker } from 'msw/browser'
import { handlers } from '../test/mocks/handlers'

const worker = setupWorker(...handlers)

beforeAll(async () => {
  await worker.start({
    onUnhandledRequest: 'error',
    // Don't show MSW logs in browser console during tests
    quiet: true,
  })
})

afterEach(() => worker.resetHandlers())
afterAll(() => worker.stop())
