import { test, expect } from '../fixtures/auth.fixture';

test.describe('Login', () => {
  test('logs in with valid credentials', async ({ loggedInPage, username }) => {
    await expect(loggedInPage.sidenavUsername).toHaveText(`@${username}`);
  });

  test('shows an error with invalid credentials', async ({ loginPage, username }) => {
    await loginPage.login(username, 'wrong-password');

    await expect(loginPage.errorAlert).toContainText('Username or password is invalid');
    await loginPage.expectUrl(/\/signin/);
  });
});
