import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["js/utils/**/*.test.js"],
  },
});
