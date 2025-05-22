import { describe, expect, test, beforeEach } from "vitest";
import { getUsername } from "./storage.js";

describe("getUsername", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns the name from user object in storage", () => {
    const user = { name: "Samal" };
    localStorage.setItem("user", JSON.stringify(user));

    expect(getUsername()).toBe("Samal");
  });

  test("returns null when no user exists in storage", () => {
    expect(getUsername()).toBeNull();
  });

});
