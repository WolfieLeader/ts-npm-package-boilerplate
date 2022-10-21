import { expect, it, describe } from "@jest/globals";
import PackageName from "../src/index";
import { randomBytes } from "crypto";

const str = randomBytes(20).toString("base64url");

describe("Testing PackageName Strings", () => {
  it("should lowercase a string", () => {
    expect(PackageName.lower(str)).toBe(str.toLowerCase());
  });
  it("should uppercase a string", () => {
    expect(PackageName.upper(str)).toBe(str.toUpperCase());
  });
});
