import { test, expect } from '@playwright/test';
import { CalculatorPage } from './helpers/calculator-page.js';

test.describe('Калькулятор в браузере', () => {
  let calculator;

  test.beforeEach(async ({ page }) => {
    calculator = new CalculatorPage(page);
    await calculator.open();
  });

  test('показывает 0 при загрузке страницы', async () => {
    await expect(calculator.display).toHaveText('0');
  });

  test('отображает введённые цифры на дисплее', async () => {
    await calculator.enterDigits('123');

    await expect(calculator.display).toHaveText('123');
  });

  test('заменяет начальный 0 при вводе первой цифры', async () => {
    await calculator.clickButton('5');

    await expect(calculator.display).toHaveText('5');
  });

  test('складывает два числа', async () => {
    await calculator.enterDigits('12');
    await calculator.clickButton('+');
    await calculator.enterDigits('8');
    await calculator.clickButton('=');

    await expect(calculator.display).toHaveText('20');
  });

  test('вычитает числа', async () => {
    await calculator.enterDigits('10');
    await calculator.clickButton('-');
    await calculator.enterDigits('3');
    await calculator.clickButton('=');

    await expect(calculator.display).toHaveText('7');
  });

  test('умножает числа', async () => {
    await calculator.enterDigits('4');
    await calculator.clickButton('×');
    await calculator.enterDigits('5');
    await calculator.clickButton('=');

    await expect(calculator.display).toHaveText('20');
  });

  test('делит числа', async () => {
    await calculator.enterDigits('15');
    await calculator.clickButton('/');
    await calculator.enterDigits('3');
    await calculator.clickButton('=');

    await expect(calculator.display).toHaveText('5');
  });

  test('показывает ошибку при делении на ноль', async () => {
    await calculator.enterDigits('5');
    await calculator.clickButton('/');
    await calculator.clickButton('0');
    await calculator.clickButton('=');

    await expect(calculator.display).toHaveText('Ошибка');
  });

  test('работает с десятичной точкой', async () => {
    await calculator.clickButton('3');
    await calculator.clickButton('.');
    await calculator.enterDigits('5');
    await calculator.clickButton('+');
    await calculator.enterDigits('5');
    await calculator.clickButton('=');

    await expect(calculator.display).toHaveText('8.5');
  });

  test('кнопка C сбрасывает дисплей', async () => {
    await calculator.enterDigits('999');
    await calculator.clickButton('C');

    await expect(calculator.display).toHaveText('0');
  });

  test('кнопка удаления убирает последний символ', async () => {
    await calculator.enterDigits('123');
    await calculator.clickButton('⌫');

    await expect(calculator.display).toHaveText('12');
  });

  test('ввод с клавиатуры и вычисление по Enter', async () => {
    await calculator.pressKey('7');
    await calculator.pressKey('+');
    await calculator.pressKey('3');
    await calculator.pressKey('Enter');

    await expect(calculator.display).toHaveText('10');
  });

  test('после вычисления новый ввод заменяет результат', async () => {
    await calculator.enterDigits('2');
    await calculator.clickButton('+');
    await calculator.enterDigits('2');
    await calculator.clickButton('=');
    await calculator.clickButton('9');

    await expect(calculator.display).toHaveText('9');
  });
});
