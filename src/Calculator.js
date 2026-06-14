export class Calculator {
  add(a, b) {
    this._validateNumbers(a, b);
    return a + b;
  }

  subtract(a, b) {
    this._validateNumbers(a, b);
    return a - b;
  }

  multiply(a, b) {
    this._validateNumbers(a, b);
    return a * b;
  }

  divide(a, b) {
    this._validateNumbers(a, b);
    if (b === 0) {
      throw new Error('Деление на ноль');
    }
    return a / b;
  }

  _validateNumbers(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('Аргументы должны быть числами');
    }
    if (Number.isNaN(a) || Number.isNaN(b)) {
      throw new TypeError('Аргументы не могут быть NaN');
    }
  }
}
