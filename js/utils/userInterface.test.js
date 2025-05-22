import { describe, test, expect } from "vitest";
import { isActivePath } from "./userInterface.js";

describe("isActivePath", () => {
  test("Returns true when current path matches href exactly", () => {
    window.location.pathname = "/";
    expect(isActivePath("/", window.location.pathname)).toBe(true);
  });

  test("matches index.html path", () => {
    window.location.pathname = "/index.html";
    expect(isActivePath("/", window.location.pathname)).toBe(true);
  });

  test("matches exact path", () => {
    window.history.pushState({}, "", "/about");
    window.location.pathname = "/about";
    expect(isActivePath("/about", window.location.pathname)).toBe(true);
  });

  test("returns false when paths do not match", () => {
    window.history.pushState({}, "", "/contact/call");
    window.location.pathname = "/contact";
    expect(isActivePath("/about", window.location.pathname)).toBe(false);
  });
});
