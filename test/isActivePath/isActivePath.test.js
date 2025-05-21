import { describe, expect, test } from "vitest";
import { isActivePath } from "./isActivePath.js";

describe("isActivePath", () => {
  test("returns true when current path matches href exactly", () => {
    expect(isActivePath("/about", "/about")).toBe(true);
  });

  test("returns true for root path when current is '/' and href is '/'", () => {
    expect(isActivePath("/", "/")).toBe(true);
  });

  test("returns true for root path when current is '/index.html' and href is '/'", () => {
    expect(isActivePath("/index.html", "/")).toBe(true);
  });

  test("returns true when current path includes href", () => {
    expect(isActivePath("/products/shoes", "/products")).toBe(true);
  });

  test("returns false when paths don't match", () => {
    expect(isActivePath("/contact", "/about")).toBe(false);
  });
});
