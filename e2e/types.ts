import { World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "playwright";

export interface Marketplace extends World {
  baseURL: string;
  context: BrowserContext;
  page: Page;
}
