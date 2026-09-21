import { expect, Locator, Page } from '@playwright/test';

export class GamePage {
  readonly page: Page;
  readonly timer: Locator;
  readonly stopButton: Locator;
  readonly homeButton: Locator;
  readonly restartButton: Locator;
  readonly successOverlayIcon: Locator;
  readonly failureOverlayIcon: Locator;
  readonly highScoresExpander: Locator;
  readonly highScoresPanel: Locator;
  readonly highScoresTableRows: Locator;
  readonly gridTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.timer = page.locator('.timer:visible');
    this.stopButton = page.locator('button.btn-danger:has-text("Stop")');
    this.homeButton = page.locator('button.btn-dark:has-text("Home")');
    this.restartButton = page.locator('button.btn-restart:has-text("Restart")');
    this.successOverlayIcon = page.locator('.overlay .fa-check');
    this.failureOverlayIcon = page.locator('.overlay .fa-times');
    this.highScoresExpander = page.locator('.expander-right');
    this.highScoresPanel = page.locator('.panel-right');
    this.highScoresTableRows = page.locator('bin-high-scores tbody tr');
    this.gridTable = page.locator('bin-grid table');
  }

  async goto(size: number): Promise<void> {
    await this.page.goto(`/play/${size}`);
    await expect(this.page).toHaveURL(new RegExp(`/play/${size}$`));
  }

  getBox(row: number, col: number): Locator {
    return this.gridTable.locator('tr').nth(row).locator('bin-box button').nth(col);
  }

  async getBoxValue(row: number, col: number): Promise<string> {
    const text = await this.getBox(row, col).innerText();
    return text.trim();
  }

  async clickBox(row: number, col: number): Promise<void> {
    await this.getBox(row, col).click();
  }

  async getRowTarget(row: number): Promise<number> {
    const text = await this.gridTable.locator('tr').nth(row).locator('td.total-right div').innerText();
    return parseInt(text.trim(), 10);
  }

  async getColTarget(col: number): Promise<number> {
    const text = await this.gridTable.locator('tr').last().locator('td.total-bottom div').nth(col).innerText();
    return parseInt(text.trim(), 10);
  }

  async isRowValid(row: number): Promise<boolean> {
    const targetDiv = this.gridTable.locator('tr').nth(row).locator('td.total-right div');
    const className = (await targetDiv.getAttribute('class')) ?? '';
    return className.includes('valid');
  }

  async isColValid(col: number): Promise<boolean> {
    const targetDiv = this.gridTable.locator('tr').last().locator('td.total-bottom div').nth(col);
    const className = (await targetDiv.getAttribute('class')) ?? '';
    return className.includes('valid');
  }

  async toggleHighScores(): Promise<void> {
    await this.highScoresExpander.dispatchEvent('click');
  }

  async openHighScoresIfMobile(): Promise<void> {
    if (await this.highScoresExpander.isVisible()) {
      await this.highScoresExpander.dispatchEvent('click');
    }
  }

  async stopGame(): Promise<void> {
    await this.stopButton.click();
    await expect(this.failureOverlayIcon).toBeVisible();
    await expect(this.restartButton).toBeVisible();
    await expect(this.homeButton).toBeVisible();
  }

  async restartGame(): Promise<void> {
    await this.restartButton.click();
    await expect(this.failureOverlayIcon).toBeHidden();
    await expect(this.stopButton).toBeVisible();
  }

  async returnHome(): Promise<void> {
    await this.homeButton.click();
    await expect(this.page).toHaveURL(/\/home$/);
  }

  /**
   * Solves the binary puzzle by reading each row target,
   * converting it to binary, and clicking any boxes that must be 1.
   */
  async solve(size: number): Promise<void> {
    for (let r = 0; r < size; r++) {
      const target = await this.getRowTarget(r);
      const binaryStr = target.toString(2).padStart(size, '0');
      for (let c = 0; c < size; c++) {
        const bit = binaryStr[c];
        const currentValue = await this.getBoxValue(r, c);
        if (bit === '1' && currentValue === '0') {
          await this.clickBox(r, c);
        } else if (bit === '0' && currentValue === '1') {
          await this.clickBox(r, c);
        }
      }
    }
  }
}
