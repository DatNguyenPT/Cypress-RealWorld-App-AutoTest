import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/** The signed-in app shell (side nav + main content). */
export class HomePage extends BasePage {
  readonly sidenavUsername: Locator;
  readonly signOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.sidenavUsername = page.getByTestId('sidenav-username');
    this.signOutButton = page.getByTestId('sidenav-signout');
  }

  async logout() {
    await this.click(this.signOutButton);
    await this.expectUrl(/\/signin/);
  }
}
