import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  // Define selectors
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly venusPasswordInput: Locator;
  readonly loginButton: Locator;

  // Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#pw");
    this.venusPasswordInput = page.locator("#password");
    this.loginButton = page.locator(
      'button:has-text("Log In"), button:has-text("LOGIN")'
    );
  }

  // Define methods
  async visitLoginPage() {
    if (process.env.ENV_URL) {
      await this.page.goto(process.env.ENV_URL);
    }
  }
  // assertion expected url
  async expectedUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  // login handler
  async performLogin(email: string, password: string) {
    try {
      if ((await this.page.$(".user-session-page")) !== null) {
        // Contentstack classic UI login
        await this.emailInput.type(email);
        await this.passwordInput.type(password);
        await this.loginButton.click();
        await this.page.click(".user-name");
        await this.page.click("text=New Interface");
        await this.page.click(".OrgDropdown");
        await this.page.click(`#${process.env.ORG_ID}`);
        await this.page.waitForTimeout(2000);
        await this.page.context().storageState({ path: "storageState.json" });
      } else {
        // Contentstack venus UI login
        await this.emailInput.type(email);
        await this.venusPasswordInput.type(password);
        const venusLoginButton = await this.page.waitForSelector(
          'button:has-text("Log In")'
        );
        await venusLoginButton.click();
        await this.page.waitForTimeout(2000);
        await this.page.context().storageState({ path: "storageState.json" });
      }
    } catch (e) {
      console.error(e);
    }
  }
}
