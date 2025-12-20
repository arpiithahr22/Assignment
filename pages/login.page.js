import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  async goto() {
    await this.page.goto(
      'https://community.cloud.automationanywhere.digital/#/login?next=/index',
      { waitUntil: 'domcontentloaded' }
    );
    await expect(this.usernameInput).toBeVisible({ timeout: 30000 });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
