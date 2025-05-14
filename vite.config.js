import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const repoName = process.env.VITE_REPO_NAME || "";

export default defineConfig({
  appType: "mpa",
  base: process.env.NODE_ENV === "production" ? `/${repoName}/` : "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login/index.html"),
        register: resolve(__dirname, "register/index.html"),
        venue: resolve(__dirname, "venue/index.html"),
      },
    },
  },
});
