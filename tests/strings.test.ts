import { expect, it, describe } from "@jest/globals";
import PackageName from "../src/index";

describe("Testing PackageName Strings", () => {
  it("should lowercase a string", () => {
    expect(PackageName.lower("TEST")).toBe("test");
  });
  it("should uppercase a string", () => {
    expect(PackageName.upper("test")).toBe("TEST");
  });
});
