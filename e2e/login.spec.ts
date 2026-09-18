import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { HomePage } from './pages/home.page';
import { clearStorage } from './helpers/auth.helper';

test.describe('Login & Authentication', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goto();
    await clearStorage(page);
    await page.reload();
  });

  test('redirects root path to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login$/);
    await expect(page).toHaveTitle('TheBinaryGame');
  });

  test('disables play button for invalid username inputs', async () => {
    // Initially empty
    await expect(loginPage.playButton).toBeDisabled();

    // Too short (< 3 characters)
    await loginPage.enterUsername('ab');
    await expect(loginPage.playButton).toBeDisabled();
    await loginPage.usernameInput.blur();
    await expect(loginPage.usernameInput).toHaveClass(/is-invalid/);

    // Too long (> 12 characters)
    await loginPage.enterUsername('thisnameiswaytoolong');
    await expect(loginPage.playButton).toBeDisabled();

    // Invalid characters (symbols not allowed)
    await loginPage.enterUsername('user@test');
    await expect(loginPage.playButton).toBeDisabled();
  });

  test('enables play button and logs in successfully with valid username', async ({ page }) => {
    await loginPage.enterUsername('Tester');
    await expect(loginPage.playButton).toBeEnabled();
    await loginPage.submit();

    await expect(page).toHaveURL(/\/home$/);
    await expect(homePage.headerUserButton).toBeVisible();
    await expect(homePage.headerUserButton).toContainText('Tester');
  });

  test('displays "Play as <username>" on /login when user is already authenticated', async ({ page }) => {
    await loginPage.login('Alice');
    await expect(page).toHaveURL(/\/home$/);

    // Return to login
    await loginPage.goto();
    await expect(loginPage.playAsUserButton).toBeVisible();
    await expect(loginPage.playAsUserButton).toContainText('Play as Alice');

    // Clicking it takes back to home
    await loginPage.resumeAsUser();
    await expect(page).toHaveURL(/\/home$/);
  });

  test('allows logging out from the header', async ({ page }) => {
    await loginPage.login('Bob');
    await homePage.logout();

    await expect(page).toHaveURL(/\/login$/);
    await expect(loginPage.playAsUserButton).toBeHidden();
    await expect(loginPage.usernameInput).toHaveValue('');
  });
});
