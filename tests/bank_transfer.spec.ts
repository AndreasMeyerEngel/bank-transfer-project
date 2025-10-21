import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { MainPage } from "../pages/mainPage";
import { TransferPage } from "../pages/transferPage";
import { AccountSummaryPage } from "../pages/accountSummaryPage";
import {
  CREDENTIALS,
  ACCOUNTS,
  TRANSFER_AMOUNT,
} from "../fixtures/bankingData";

test.describe("Cenário 1: Transferência Bancária", () => {
  let loginPage: LoginPage;
  let mainPage: MainPage;
  let transferPage: TransferPage;
  let summaryPage: AccountSummaryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    transferPage = new TransferPage(page);
    summaryPage = new AccountSummaryPage(page);

    await loginPage.goto();
    await loginPage.login(CREDENTIALS.user, CREDENTIALS.pass);
    await loginPage.checkLoginSuccess();
  });

  test("Deve realizar uma transferência e validar o saldo e extrato", async () => {
    await mainPage.clickAccountSummary();
    await summaryPage.selectAccount(ACCOUNTS.checking);
    const initialBalance = await summaryPage.getAvailableBalance();
    console.log(`Saldo Inicial: ${initialBalance}`);

    await mainPage.clickTransferFunds();
    await transferPage.makeTransfer(
      ACCOUNTS.corporate,
      ACCOUNTS.checking,
      TRANSFER_AMOUNT
    );
    await transferPage.checkTransferSuccess();

    await mainPage.clickAccountSummary();
    await summaryPage.selectAccount(ACCOUNTS.checking);

    await summaryPage.checkLastTransaction(TRANSFER_AMOUNT);

    const finalBalance = await summaryPage.getAvailableBalance();
    console.log(`Saldo Final: ${finalBalance}`);

    const numericAmount = parseFloat(TRANSFER_AMOUNT);
    const expectedBalance = initialBalance + numericAmount;

    expect(finalBalance).toBeCloseTo(expectedBalance);
  });
});
