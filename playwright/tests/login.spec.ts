import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Seeded user from data/database.json; password comes from SEED_DEFAULT_USER_PASSWORD in the root .env
const USERNAME = 'Heath93';
const PASSWORD = process.env.SEED_DEFAULT_USER_PASSWORD ?? 's3cret';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('logs in with valid credentials', async ({ page }) => {
    await loginPage.login(USERNAME, PASSWORD);

    await expect(page).not.toHaveURL(/\/signin/);
    await expect(page.getByTestId('sidenav-username')).toContainText(`@${USERNAME}`);
  });

  test('shows an error with invalid credentials', async ({ page }) => {
    await loginPage.login(USERNAME, 'wrong-password');

    await loginPage.expectError('Username or password is invalid');
    await expect(page).toHaveURL(/\/signin/);
  });
});
