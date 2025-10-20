import { type Page, type Locator, expect } from "@playwright/test";

export class AccountSummaryPage {
  readonly page: Page;
  readonly accountSelect: Locator;
  readonly viewAccountButton: Locator;
  readonly availableBalanceCell: Locator;
  readonly transactionTableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountSelect = page.locator("#listAccounts");
    this.viewAccountButton = page.locator("#btnGetAccount");
    this.availableBalanceCell = page.locator(
      'td:has-text("Available balance") + td'
    );

    this.transactionTableRows = page.locator("#recent table tr");
  }

  private parseMoneyValue(text: string): number {
    return parseFloat(text.replace(/[$,]/g, ""));
  }

  async selectAccount(account: string): Promise<void> {
    await this.accountSelect.selectOption({ value: account });
    await this.viewAccountButton.click();

    await expect(this.page.locator("h1")).toContainText(
      `Account History - ${account}`
    );
  }

  async getAvailableBalance(): Promise<number> {
    const text = await this.availableBalanceCell.innerText();
    return this.parseMoneyValue(text);
  }

  async checkLastTransaction(amount: string): Promise<void> {
    const firstTransactionCell = this.transactionTableRows
      .first()
      .locator("td")
      .nth(2);

    const transactionText = await firstTransactionCell.innerText();

    const actualAmount = Math.abs(this.parseMoneyValue(transactionText));
    const expectedAmount = parseFloat(amount);

    expect(actualAmount).toBe(expectedAmount);
  }
}
