import { expect, it, describe } from "@jest/globals";
import PackageName from "../src/index";

describe("Testing PackageName", () => {
  it("should be an object", () => {
    expect(PackageName).toBeInstanceOf(Object);
  });
});
