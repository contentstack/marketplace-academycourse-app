import { expect, Locator, Page } from "@playwright/test";

export class AssetPage {
  // Define selectors
  readonly page: Page;
  readonly entriesPage: Locator;
  readonly saveButton: Locator;
  readonly widgetLocator: Locator;

  // Initialize selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.entriesPage = page.locator('svg[name="Assets"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.widgetLocator = page.locator('svg[name="Widgets"]');
  }

  // Define methods

  // navigate to an asset
  async navigateToAsset(assetUid: string) {
    await this.page.goto(
      `/#!/stack/${process.env.STACK_API_KEY}/assets/${assetUid}`
    );
    await this.page.waitForLoadState();
  }

  // Widget selector on the asset page
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

  // Check for Asset Sidebar Widget
  async validateAssetSideBar(assetId: string) {
    await this.navigateToAsset(assetId);
    await this.widgetSelector();
    const frame = await this.accessFrame();
    await frame?.waitForSelector(".app-component-content");
    const locateText: any = await frame?.locator('text="Asset Sidebar Widget"');
    const matchText = await locateText?.innerText();
    expect(matchText).toBe("Asset Sidebar Widget");
  }
}
