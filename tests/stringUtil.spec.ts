import { getString, getString2 } from "../src/utils/stringUtil";

describe("hello", () => {
  test("getString", () => {
    expect(getString()).toBe("hello");
  });
  test("getString", () => {
    expect(getString2()).toBe("hello");
  });
});
