import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly playButton: Locator;
  readonly playAsUserButton: Locator;
  readonly githubLink: Locator;
  readonly aboutButton: Locator;
  readonly buildInfo: Locator;
  readonly buildInfoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.playButton = page.locator('form button[type="submit"]');
    this.playAsUserButton = page.locator('button:has-text("Play as")');
    this.githubLink = page.locator('bin-header a[href*="github.com/LoicViennois/The-Binary-Game"]');
    this.aboutButton = page.locator('bin-header a:has(.fa-info-circle)');
    this.buildInfo = page.locator('.build-info');
    this.buildInfoLink = page.locator('.build-info a');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
    await expect(this.page).toHaveTitle('TheBinaryGame');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async submit(): Promise<void> {
    await this.playButton.click();
  }

  async login(username: string): Promise<void> {
    await this.goto();
    await this.enterUsername(username);
    await this.submit();
    await expect(this.page).toHaveURL(/\/home$/);
  }

  async resumeAsUser(): Promise<void> {
    await this.playAsUserButton.click();
    await expect(this.page).toHaveURL(/\/home$/);
  }

  async openAboutModal(): Promise<void> {
    await this.aboutButton.click();
  }
}
