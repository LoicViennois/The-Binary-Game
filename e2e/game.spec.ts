import { test, expect } from '@playwright/test';
import { GamePage } from './pages/game.page';
import { loginAs } from './helpers/auth.helper';

test.describe('Game Play & Puzzles', () => {
  let gamePage: GamePage;

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'Gamer');
    gamePage = new GamePage(page);
    await gamePage.goto(3);
  });

  test('initializes 3x3 grid with all zeros and running timer', async () => {
    // Check all 9 boxes are '0' initially
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        expect(await gamePage.getBoxValue(r, c)).toBe('0');
      }
    }

    // Timer is active and visible
    await expect(gamePage.timer).toBeVisible();
    await expect(gamePage.stopButton).toBeVisible();
  });

  test('toggles box state between 0 and 1 on click', async () => {
    expect(await gamePage.getBoxValue(0, 0)).toBe('0');

    await gamePage.clickBox(0, 0);
    expect(await gamePage.getBoxValue(0, 0)).toBe('1');

    await gamePage.clickBox(0, 0);
    expect(await gamePage.getBoxValue(0, 0)).toBe('0');
  });

  test('stops the game and allows restarting or returning home', async ({ page }) => {
    await gamePage.stopGame();

    // Verify failure icon and action buttons
    await expect(gamePage.failureOverlayIcon).toBeVisible();
    await expect(gamePage.restartButton).toBeVisible();
    await expect(gamePage.homeButton).toBeVisible();

    // Restart game
    await gamePage.restartGame();
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        expect(await gamePage.getBoxValue(r, c)).toBe('0');
      }
    }

    // Stop again and return home
    await gamePage.stopGame();
    await gamePage.returnHome();
    await expect(page).toHaveURL(/\/home$/);
  });

  test('solves 3x3 puzzle, displays victory overlay, and logs high score', async () => {
    await gamePage.solve(3);

    // Victory overlay appears
    await expect(gamePage.successOverlayIcon).toBeVisible();

    // Verify all row targets have .valid class
    for (let r = 0; r < 3; r++) {
      expect(await gamePage.isRowValid(r)).toBe(true);
    }

    // Verify all col targets have .valid class
    for (let c = 0; c < 3; c++) {
      expect(await gamePage.isColValid(c)).toBe(true);
    }

    // Verify the player's score was recorded (expanding on mobile if needed)
    await gamePage.openHighScoresIfMobile();
    await expect(gamePage.highScoresPanel).toBeVisible();
    await expect(gamePage.highScoresTableRows.first()).toContainText('Gamer');
  });

  test('toggles the high scores side panel on mobile/small screens', async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });
    await expect(gamePage.highScoresPanel).not.toHaveClass(/expanded/);

    await gamePage.toggleHighScores();
    await expect(gamePage.highScoresPanel).toHaveClass(/expanded/);

    await gamePage.toggleHighScores();
    await expect(gamePage.highScoresPanel).not.toHaveClass(/expanded/);
  });
});
