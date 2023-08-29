import { expect, Locator, Page } from "@playwright/test";

export class EntryPage {
  // Define selectors
  readonly page: Page;
  readonly entriesPage: Locator;
  readonly saveButton: Locator;
  readonly widgetLocator: Locator;

  // Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.entriesPage = page.locator('svg[name="Entries"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.widgetLocator = page.locator('svg[name="Widgets"]');
  }

  // Define methods

  // navigate to entry page
  async navigateToDashboard() {
    await this.page.goto(`/#!/stack/${process.env.STACK_API_KEY}/dashboard`);
    await this.page.waitForLoadState();
  }

  // navigate to entry page
  async navigateToEntry(
    apiKey: string,
    contentTypeUID: string,
    entryUID: string
  ) {
    await this.page.goto(
      `/#!/stack/${apiKey}/content-type/${contentTypeUID}/en-us/entry/${entryUID}/edit`
    );
    await this.page.waitForLoadState();
  }

  // Widget selector on the entry page
  async widgetSelector() {
    await this.page.waitForSelector('svg[name="Widgets"]');
    await this.widgetLocator.click();
  }

  // Return iframe
  async accessFrame() {
    const elementHandle = await this.page.waitForSelector(
      "div.cs-extension iframe"
    );
    const frame = await elementHandle.contentFrame();
    return frame;
  }

  // Check for dashboard widget
  async validateDashboardWidget() {
    const frame = await this.accessFrame();
    await frame?.waitForSelector(".app-component-content");
    const locateText: any = await frame?.locator('text="Dashboard Widget"');
    const matchText = await locateText?.innerText();
    expect(matchText).toBe("Dashboard Widget");
  }

  // Check for entry custom field & entry side bar
  async validateCustomField() {
    const frame = await this.accessFrame();
    await frame?.waitForSelector(".custom-field-container");
    const locateText = await frame?.locator("text='Custom Field'");
    const matchText = await locateText?.innerText();
    expect(matchText).toBe("Custom Field");
    await this.widgetSelector();
    const sideBarWidget = await frame?.locator(
      ".entry-sidebar-container >> text=Sidebar Widget"
    );
    expect(sideBarWidget).toBeTruthy();
  }
}
