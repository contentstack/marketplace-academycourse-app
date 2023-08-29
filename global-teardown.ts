import { chromium, FullConfig } from "@playwright/test";
const fs = require("fs");

async function globalTeardown(config: FullConfig) {
  await fs.unlink("data.json", (err) => {
    if (err) {
      throw err;
    }
  });
}

export default globalTeardown;
