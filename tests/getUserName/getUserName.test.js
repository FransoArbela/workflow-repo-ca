import { describe, expect, test, beforeEach } from "vitest";
import { getUserName } from "./getUserName.js";

describe("getUserName", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns the name from user object in storage", () => {
    const user = { name: "Samal" };
    localStorage.setItem("user", JSON.stringify(user));

    expect(getUserName()).toBe("Samal");
  });

  test("returns null when no user exists in storage", () => {
    expect(getUserName()).toBeNull();
  });

  test("returns null when user exists but has no name", () => {
    localStorage.setItem("user", JSON.stringify({}));
    expect(getUserName()).toBeNull();
  });
});
