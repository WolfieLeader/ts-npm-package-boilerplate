import { expect, it, describe } from "@jest/globals";
import PackageName from "../src/index";

const num1 = Math.floor(Math.random() * 100) + 1;
const num2 = Math.floor(Math.random() * 100) + 1;

describe("Testing PackageName Numbers", () => {
  it("should add two numbers", () => {
    expect(PackageName.add(num1, num2)).toBe(num1 + num2);
  });
  it("should subtract two numbers", () => {
    expect(PackageName.subtract(num1, num2)).toBe(num1 - num2);
  });
});
