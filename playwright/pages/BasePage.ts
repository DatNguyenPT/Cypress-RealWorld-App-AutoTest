import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async isVisible(locator: Locator) {
    return await locator.isVisible();
  }

  async waitForVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async getPageTitle() {
    return await this.page.title();
  }
}