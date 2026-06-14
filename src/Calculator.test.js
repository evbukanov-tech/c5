import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from './Calculator.js';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('складывает два положительных числа', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('складывает отрицательные числа', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it('складывает положительное и отрицательное число', () => {
      expect(calculator.add(10, -4)).toBe(6);
    });

    it('складывает числа с плавающей точкой', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('возвращает второй операнд при сложении с нулём', () => {
      expect(calculator.add(0, 7)).toBe(7);
      expect(calculator.add(7, 0)).toBe(7);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.add('2', 3)).toThrow(TypeError);
      expect(() => calculator.add(2, null)).toThrow('Аргументы должны быть числами');
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calculator.add(NaN, 1)).toThrow('Аргументы не могут быть NaN');
      expect(() => calculator.add(1, NaN)).toThrow(TypeError);
    });
  });

  describe('subtract', () => {
    it('вычитает два положительных числа', () => {
      expect(calculator.subtract(10, 3)).toBe(7);
    });

    it('возвращает отрицательный результат при вычитании большего числа', () => {
      expect(calculator.subtract(3, 10)).toBe(-7);
    });

    it('вычитает отрицательные числа', () => {
      expect(calculator.subtract(-5, -3)).toBe(-2);
    });

    it('вычитает числа с плавающей точкой', () => {
      expect(calculator.subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });

    it('возвращает исходное число при вычитании нуля', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.subtract(undefined, 1)).toThrow(TypeError);
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calculator.subtract(NaN, 0)).toThrow('Аргументы не могут быть NaN');
    });
  });

  describe('multiply', () => {
    it('умножает два положительных числа', () => {
      expect(calculator.multiply(4, 5)).toBe(20);
    });

    it('умножает отрицательные числа', () => {
      expect(calculator.multiply(-3, -4)).toBe(12);
    });

    it('возвращает отрицательный результат при умножении чисел разных знаков', () => {
      expect(calculator.multiply(-2, 5)).toBe(-10);
    });

    it('возвращает ноль при умножении на ноль', () => {
      expect(calculator.multiply(100, 0)).toBe(0);
    });

    it('умножает числа с плавающей точкой', () => {
      expect(calculator.multiply(0.2, 0.3)).toBeCloseTo(0.06);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.multiply({}, 2)).toThrow('Аргументы должны быть числами');
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calculator.multiply(2, NaN)).toThrow(TypeError);
    });
  });

  describe('divide', () => {
    it('делит два положительных числа', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('делит отрицательное на положительное', () => {
      expect(calculator.divide(-10, 2)).toBe(-5);
    });

    it('делит отрицательное на отрицательное', () => {
      expect(calculator.divide(-10, -2)).toBe(5);
    });

    it('делит числа с плавающей точкой', () => {
      expect(calculator.divide(1, 3)).toBeCloseTo(0.333333);
    });

    it('возвращает ноль при делении нуля на число', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    it('выбрасывает ошибку при делении на ноль', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Деление на ноль');
    });

    it('выбрасывает ошибку при делении на ноль с отрицательным числителем', () => {
      expect(() => calculator.divide(-5, 0)).toThrow(Error);
      expect(() => calculator.divide(-5, 0)).toThrow('Деление на ноль');
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calculator.divide(10, '2')).toThrow(TypeError);
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calculator.divide(NaN, 2)).toThrow('Аргументы не могут быть NaN');
    });
  });
});
