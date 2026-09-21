import { expect, Locator, Page } from '@playwright/test';

export class AboutModalPage {
  readonly page: Page;
  readonly modal: Locator;
  readonly title: Locator;
  readonly closeButton: Locator;
  readonly commitLink: Locator;
  readonly gplLicenseLink: Locator;
  readonly githubIssuesLink: Locator;
  readonly redditFeedbackLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('.modal-content');
    this.title = this.modal.locator('.modal-title');
    this.closeButton = this.modal.locator('.modal-header button.btn-close');
    this.commitLink = this.modal.locator('a[aria-label="commit"]');
    this.gplLicenseLink = this.modal.locator('a[href*="gnu.org/licenses/gpl"]');
    this.githubIssuesLink = this.modal.locator('a[href*="github.com/LoicViennois/The-Binary-Game/issues"]');
    this.redditFeedbackLink = this.modal.locator('a[href*="reddit.com/message"]');
  }

  async waitForOpen(): Promise<void> {
    await expect(this.modal).toBeVisible();
    await expect(this.title).toHaveText('Licence notice');
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await expect(this.modal).toBeHidden();
  }
}
