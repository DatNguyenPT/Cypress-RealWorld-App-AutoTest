import { test as baseTest, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

type AuthFixtures = {
  /** Signed out, on /signin. */
  loginPage: LoginPage;
  /** Signed in as `username`; signs out on teardown. */
  loggedInPage: HomePage;
  username: string;
  password: string;
};

export const test = baseTest.extend<AuthFixtures>({
  // `option: true` lets a spec or project override these via test.use({ username: ... })
  username: [process.env.TEST_USERNAME ?? '', { option: true }],
  password: [process.env.TEST_PASSWORD ?? '', { option: true }],

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  loggedInPage: async ({ page, loginPage, username, password }, use) => {
    if (!username || !password) {
      throw new Error('TEST_USERNAME and TEST_PASSWORD must be set (see the repo-root .env)');
    }

    await loginPage.login(username, password);
    const homePage = new HomePage(page);
    await homePage.expectUrlNot(/\/signin/);

    await use(homePage);

    await homePage.logout();
  },
});

export { expect };
