import { assert, afterEach, expect, vi } from "vitest";
import * as utils from "#src/utils";
import {
  dodgySquared,
  dodgySquaredWithOtherModuleDependency,
} from "#src/basic";

// Copy of test/mock.test.ts
// Try in storybook test project to make sure mocking works

vi.mock("#src/utils", () => {
  return {
    dodgyMultiplyFromOtherModule: vi.fn((a: number, b: number) => {
      console.log("Calling mocked function");
      return a * b;
    }),
  };
});

vi.mock("#src/basic", async () => {
  const actual = await vi.importActual<typeof import("#src/basic")>(
    "#src/basic"
  );
  return {
    ...actual,
    dodgySquared: vi.fn((n: number) => {
      console.log("Calling mocked dodgySquared");
      return n * n;
    }),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("mocking", () => {
  it("should mock function from the same module", () => {
    assert.equal(dodgySquared(4), 16);
    expect(dodgySquared).toHaveBeenCalledTimes(1);
  });
  it("should mock function from another module", () => {
    assert.equal(dodgySquaredWithOtherModuleDependency(4), 16);
    expect(utils.dodgyMultiplyFromOtherModule).toHaveBeenCalledTimes(1);
  });
});
