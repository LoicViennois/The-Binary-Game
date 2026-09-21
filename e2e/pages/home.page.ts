import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly headerUserButton: Locator;
  readonly gameLinkButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerUserButton = page.locator('header button.btn-outline-dark');
    this.gameLinkButtons = page.locator('.game-link');
  }

  async goto(): Promise<void> {
    await this.page.goto('/home');
    await expect(this.page).toHaveURL(/\/home$/);
  }

  async selectSize(size: number): Promise<void> {
    const sizeButton = this.page.locator(`.game-link:has-text("${size} x ${size}")`);
    await sizeButton.click();
    await expect(this.page).toHaveURL(new RegExp(`/play/${size}$`));
  }

  async logout(): Promise<void> {
    await this.headerUserButton.click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async getUsernameText(): Promise<string> {
    const text = await this.headerUserButton.innerText();
    return text.trim();
  }
}
