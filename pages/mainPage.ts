import { type Page, type Locator } from "@playwright/test";

export class MainPage {
  readonly page: Page;
  readonly transferFundsLink: Locator;
  readonly viewSummaryLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferFundsLink = page.locator("#MenuHyperLink3");
    this.viewSummaryLink = page.locator("#listAccounts");
  }

  async clickTransferFunds(): Promise<void> {
    await this.transferFundsLink.click();
  }

  async clickAccountSummary(): Promise<void> {
    await this.page.click("text=View Account Summary");
  }
}
