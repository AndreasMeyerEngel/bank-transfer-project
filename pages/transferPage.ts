import { type Page, type Locator, expect } from "@playwright/test";

export class TransferPage {
  readonly page: Page;
  readonly fromAccountSelect: Locator;
  readonly toAccountSelect: Locator;
  readonly amountInput: Locator;
  readonly transferButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fromAccountSelect = page.locator("#fromAccount");
    this.toAccountSelect = page.locator("#toAccount");
    this.amountInput = page.locator("#transferAmount");
    this.transferButton = page.locator("#transfer");
    this.confirmationMessage = page.locator('span[style="color: Red"]');
  }

  async makeTransfer(from: string, to: string, amount: string): Promise<void> {
    await this.fromAccountSelect.selectOption({ value: from });
    await this.toAccountSelect.selectOption({ value: to });
    await this.amountInput.fill(amount);
    await this.transferButton.click();
  }

  async checkTransferSuccess(): Promise<void> {
    await expect(this.confirmationMessage).toContainText("was successfully transferred");
  }
}
