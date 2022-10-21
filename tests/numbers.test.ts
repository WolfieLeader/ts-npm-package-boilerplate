import { expect, it, describe } from "@jest/globals";
import PackageName from "../src/index";

describe("Testing PackageName Numbers", () => {
  it("should add two numbers", () => {
    expect(PackageName.add(1, 2)).toBe(3);
  });
  it("should subtract two numbers", () => {
    expect(PackageName.subtract(2, 1)).toBe(1);
  });
});
