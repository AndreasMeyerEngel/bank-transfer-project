import { type Page, type Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signOffLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="uid"]');
    this.passwordInput = page.locator('input[name="passw"]');
    this.loginButton = page.locator('input[name="btnSubmit"]');
    this.signOffLink = page.locator("text=Sign Off");
  }

  async goto(): Promise<void> {
    await this.page.goto("/login.jsp");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async checkLoginSuccess(): Promise<void> {
    await expect(this.signOffLink).toBeVisible({ timeout: 10000 });
  }
}
