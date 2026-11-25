import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // MUI TextField puts data-test on the wrapper div, so target the inner <input>
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId('signin-username').locator('input');
    this.passwordInput = page.getByTestId('signin-password').locator('input');
    this.rememberMeCheckbox = page.getByTestId('signin-remember-me').locator('input');
    this.submitButton = page.getByTestId('signin-submit');
    this.errorAlert = page.getByTestId('signin-error');
    this.signUpLink = page.getByTestId('signup');
  }

  async goto() {
    await this.navigate('/signin');
    await this.waitForVisible(this.usernameInput);
  }

  async login(username: string, password: string, rememberMe = false) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.click(this.submitButton);
  }

  async expectError(message: string) {
    await expect(this.errorAlert).toBeVisible();
    await expect(this.errorAlert).toContainText(message);
  }
}
