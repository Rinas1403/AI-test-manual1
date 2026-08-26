import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly sidebarDashboardLink: Locator;
  readonly userProfileToggle: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.sidebarDashboardLink = page.getByRole('link', { name: 'Dashboard' }).first();
    this.userProfileToggle = page.locator('li.header-user-profile > a.dropdown-toggle');
    // Scoped to the profile dropdown: the page has two other hidden "Logout" links
    // (a mobile-nav duplicate and a session-timeout modal template) that also match `li.header-logout a`.
    this.logoutLink = page.locator('li.header-user-profile > ul.dropdown-menu > li.header-logout a');
  }

  async isLoaded(): Promise<boolean> {
    return this.sidebarDashboardLink.isVisible();
  }

  async logout(): Promise<void> {
    await this.userProfileToggle.click();
    await this.logoutLink.click();
  }
}
