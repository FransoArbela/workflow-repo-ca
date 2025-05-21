import { describe, expect, test, beforeEach, vi } from "vitest";
import { getUserName } from "./getUserName.js";

describe("getUserName", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  test("returns the name from the user object in storage", () => {
    localStorage.getItem.mockReturnValue(JSON.stringify({ name: "Franso" }));
    expect(getUserName()).toBe("Franso");
  });

  test("returns null when no user exists in storage", () => {
    localStorage.getItem.mockReturnValue(null);
    expect(getUserName()).toBeNull();
  });

  test("returns null if user has no name", () => {
    localStorage.getItem.mockReturnValue(JSON.stringify({}));
    expect(getUserName()).toBeNull();
  });
});
