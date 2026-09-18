import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { AboutModalPage } from './pages/about-modal.page';
import { clearStorage } from './helpers/auth.helper';

test.describe('Navigation & Modals', () => {
  let loginPage: LoginPage;
  let aboutModal: AboutModalPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    aboutModal = new AboutModalPage(page);
    await loginPage.goto();
    await clearStorage(page);
  });

  test('redirects unauthenticated users to /login when accessing protected routes', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL(/\/login$/);

    await page.goto('/play/3');
    await expect(page).toHaveURL(/\/login$/);

    await page.goto('/non-existent-route');
    await expect(page).toHaveURL(/\/login$/);
  });

  test('contains valid external GitHub repository link', async () => {
    await expect(loginPage.githubLink).toBeVisible();
    await expect(loginPage.githubLink).toHaveAttribute('href', 'https://github.com/LoicViennois/The-Binary-Game');
    await expect(loginPage.githubLink).toHaveAttribute('target', '_blank');
  });

  test('opens and closes the About modal dialog', async () => {
    await loginPage.openAboutModal();
    await aboutModal.waitForOpen();

    await expect(aboutModal.commitLink).toBeVisible();
    await expect(aboutModal.gplLicenseLink).toBeVisible();
    await expect(aboutModal.githubIssuesLink).toBeVisible();
    await expect(aboutModal.redditFeedbackLink).toBeVisible();

    await aboutModal.close();
  });
});
