import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly confirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Forgot Password' });
    this.emailInput = page.locator('#email');
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
  }
}
