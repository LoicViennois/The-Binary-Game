import { test, expect } from '@playwright/test';
import { HomePage } from './pages/home.page';
import { loginAs } from './helpers/auth.helper';

test.describe('Home Page - Game Selection', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'Player');
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('displays available game grid sizes and navigates to the selected game', async ({ page }) => {
    for (const size of [3, 4, 5, 6]) {
      await expect(page.locator(`.game-link:has-text("${size} x ${size}")`)).toBeVisible();
    }

    // Select 3 x 3
    await homePage.selectSize(3);
    await expect(page).toHaveURL(/\/play\/3$/);

    // Return to home and select 4 x 4
    await homePage.goto();
    await homePage.selectSize(4);
    await expect(page).toHaveURL(/\/play\/4$/);
  });

  test('displays larger grid sizes (7x7 and 8x8) on desktop screens', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Large sizes 7x7 and 8x8 are only displayed on desktop');

    await expect(page.locator('.game-link:has-text("7 x 7")')).toBeVisible();
    await expect(page.locator('.game-link:has-text("8 x 8")')).toBeVisible();

    await homePage.selectSize(7);
    await expect(page).toHaveURL(/\/play\/7$/);
  });
});
