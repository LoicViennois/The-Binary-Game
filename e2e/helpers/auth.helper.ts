import { Page } from '@playwright/test';

export async function loginAs(page: Page, username = 'Alice'): Promise<void> {
  await page.addInitScript((name: string) => {
    localStorage.setItem(
      'tb_user',
      JSON.stringify({
        uid: name.toLowerCase(),
        name,
      })
    );
  }, username);
}

export async function clearStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
  });
}
