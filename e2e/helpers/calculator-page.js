export class CalculatorPage {
  constructor(page) {
    this.page = page;
    this.display = page.locator('#display');
  }

  async open() {
    await this.page.goto('/calculator.html');
  }

  async clickButton(label) {
    if (label === '.') {
      await this.page.locator('button[onclick="appendDecimal()"]').click();
      return;
    }

    await this.page.getByRole('button', { name: label, exact: true }).click();
  }

  async enterDigits(digits) {
    for (const digit of digits) {
      await this.clickButton(digit);
    }
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }
}
