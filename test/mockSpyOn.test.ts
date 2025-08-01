import { vi, assert, describe, it, beforeEach, afterEach, expect } from 'vitest'
import * as utils from '#src/utils'
import { dodgySquaredWithOtherModuleDependency } from '#src/basic'

beforeEach(() => {
  vi.spyOn(utils, 'dodgyMultiplyFromOtherModule').mockImplementation((a, b) => {
    console.log('Calling mocked function')
    return a * b
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('mocking', () => {
  it.skip('should mock function from another module', () => {
    assert.equal(dodgySquaredWithOtherModuleDependency(4), 16)
    expect(utils.dodgyMultiplyFromOtherModule).toHaveBeenCalledTimes(1)
  })
})
