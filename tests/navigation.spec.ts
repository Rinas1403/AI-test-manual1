import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { ForgotPasswordPage } from '../src/pages/ForgotPasswordPage';
import { env } from '../src/config/env';

test.describe('CRM Login - navigation flows', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('should navigate to the forgot password page', async ({ page }) => {
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await loginPage.forgotPasswordLink.click();

    await expect(page).toHaveURL(/authentication\/forgot_password/);
    await expect(forgotPasswordPage.heading).toBeVisible();
  });

  test('should login successfully with "remember me" checked', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.fillEmail(env.credentials.email);
    await loginPage.fillPassword(env.credentials.password);
    await loginPage.rememberMeCheckbox.check();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
    await loginPage.submit();

    await expect(page).not.toHaveURL(/authentication/);
    await expect(dashboardPage.sidebarDashboardLink).toBeVisible();
  });

  test('should log out and redirect back to the login page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(env.credentials.email, env.credentials.password);
    await expect(dashboardPage.sidebarDashboardLink).toBeVisible();

    await dashboardPage.logout();

    await expect(page).toHaveURL(new RegExp(`${env.loginPath}$`));
    await expect(loginPage.emailInput).toBeVisible();
  });
});
