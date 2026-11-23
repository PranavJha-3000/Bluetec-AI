import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  webServer: { command: "npm run build && npm run start -- -p 3100", url: "http://localhost:3100", reuseExistingServer: true, timeout: 240000 },
  use: { baseURL: "http://localhost:3100" },
});
