import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    // saucedemo uses data-test attributes, so getByTestId works out of the box
    testIdAttribute: 'data-test',
    // Keep evidence for every test: final screenshot and a video of the whole run
    screenshot: 'on',
    video: 'on',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
