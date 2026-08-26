import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { env } from '../src/config/env';

test.describe('CRM Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(env.credentials.email, env.credentials.password);

    await expect(page).toHaveTitle('Dashboard');
    await expect(page).not.toHaveURL(/authentication/);
    await expect(dashboardPage.sidebarDashboardLink).toBeVisible();
  });

  test('should show an error with an invalid password', async () => {
    await loginPage.login(env.credentials.email, 'wrong-password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
  });

  test('should show an error with a non-existent email', async () => {
    await loginPage.login('nonexistent@example.com', env.credentials.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
  });

  test('should show validation errors when submitting empty credentials', async () => {
    await loginPage.submit();

    await expect(loginPage.errorMessage).toHaveCount(2);
    await expect(loginPage.errorMessage.filter({ hasText: 'Email Address field is required' })).toBeVisible();
    await expect(loginPage.errorMessage.filter({ hasText: 'Password field is required' })).toBeVisible();
  });
});
