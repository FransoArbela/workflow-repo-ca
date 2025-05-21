import { describe, test, expect } from "vitest";
import { isActivePath } from "./isActivePath.js";

describe("isActivePath", () => {
  test("matches root path exactly", () => {
    window.location.pathname = "/";
    expect(isActivePath(window.location.pathname, "/")).toBe(true);
  });

  test("matches index.html path", () => {
    window.location.pathname = "/index.html";
    expect(isActivePath(window.location.pathname, "/")).toBe(true);
  });

  test("matches exact path", () => {
    window.history.pushState({}, "", "/about");
    window.location.pathname = "/about";
    expect(isActivePath(window.location.pathname, "/about")).toBe(true);
  });

  test("returns false when paths do not match", () => {
    window.history.pushState({}, "", "/contact");
    window.location.pathname = "/contact";
    expect(isActivePath(window.location.pathname, "/about")).toBe(false);
  });
});
