# CRM Login Automation

Playwright + TypeScript automation framework for
[Perfex CRM Demo](https://crm.anhtester.com/admin/authentication), using the Page Object Model (POM) pattern.

## Project structure

```
├── playwright.config.ts       # Playwright configuration
├── src/
│   ├── config/env.ts          # Environment / credential configuration
│   └── pages/
│       ├── BasePage.ts            # Shared page behavior
│       ├── LoginPage.ts           # Login page object
│       ├── ForgotPasswordPage.ts  # Forgot password page object
│       └── DashboardPage.ts       # Dashboard page object (post-login)
├── tests/
│   ├── login.spec.ts          # Login test scenarios
│   └── navigation.spec.ts     # Forgot password / remember me / logout scenarios
└── .env.example                # Sample environment variables
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npm run install:browsers
   ```

3. Copy `.env.example` to `.env` and adjust credentials if needed:

   ```bash
   cp .env.example .env
   ```

## Running tests

```bash
npm test                # run all tests headless
npm run test:headed     # run with browser UI visible
npm run test:ui         # run with Playwright's UI mode
npm run test:debug      # step through tests in debug mode
npm run report          # open the last HTML report
```

Run a single browser project:

```bash
npx playwright test --project=chromium
```

## Test scenarios covered

- Successful login with valid credentials (redirects to Dashboard).
- Invalid password shows "Invalid email or password".
- Non-existent email shows "Invalid email or password".
- Submitting empty credentials shows a validation error.
- Navigating to the Forgot Password page from the login form.
- Successful login with "Remember me" checked.
- Logging out from the Dashboard redirects back to the login page.

## Notes

- Credentials are read from `.env` (`LOGIN_EMAIL`, `LOGIN_PASSWORD`, `BASE_URL`) via `src/config/env.ts`
  instead of being hardcoded in tests, so they can be swapped per environment.
- `.env` is git-ignored — only `.env.example` is committed.
