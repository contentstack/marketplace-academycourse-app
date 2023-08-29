import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
require("dotenv").config();

const config: PlaywrightTestConfig = {
  /**
   * globalSetup & teardown of test data
   */
  globalSetup: require.resolve("./global-setup"),
  globalTeardown: require.resolve("./global-teardown"),
  testDir: "./e2e/tests",
  timeout: 30 * 10000,
  expect: {
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { open: "never" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    storageState: "storageState.json",
    actionTimeout: 0,
    screenshot: "off",
    video: "off",
    viewport: { width: 1920, height: 720 },
    trace: "on-first-retry",
    baseURL: process.env.ENV_URL,
    launchOptions: {
      logger: {
        isEnabled: () => {
          return false;
        },
        log: (name, severity, message, args) =>
          console.log(`${name}: ${message}`),
      },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
      },
    },
  ],
};

export default config;
