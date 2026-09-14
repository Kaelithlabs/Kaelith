import { test, expect } from "bun:test";
import { getInitials } from "./Avatar";

test("getInitials formats single name", () => {
  expect(getInitials("Kaelith")).toBe("KA");
});

test("getInitials formats first and last name", () => {
  expect(getInitials("Jane Doe")).toBe("JD");
});

test("getInitials handles multiple names", () => {
  expect(getInitials("John Ronald Reuel Tolkien")).toBe("JT");
});

test("getInitials handles empty or whitespace name", () => {
  expect(getInitials("")).toBe("");
  expect(getInitials("   ")).toBe("");
  expect(getInitials(undefined)).toBe("");
});
