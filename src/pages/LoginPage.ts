import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { env } from '../config/env';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.rememberMeCheckbox = page.locator('#remember');
    this.loginButton = page.locator('button[type="submit"]');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
    this.errorMessage = page.locator('.alert-danger');
  }

  async open(): Promise<void> {
    await this.goto(env.loginPath);
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string, rememberMe = false): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.submit();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.first().textContent())?.trim() ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.first().isVisible();
  }
}
