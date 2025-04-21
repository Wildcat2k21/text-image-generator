// Тестирование модуля math

import { describe, it, expect } from "vitest";
import { multiplyMatrices, createRotationMatrix, DecartVector } from "../helpers/Math";

describe("Модуль math.js", () => {
    it("Должен перемножать матрицы с равенством n = m", () => {
        const matrixA = [[1, 2], [3, 4]];
        const matrixB = [[5, 6], [7, 8]];

        const result = multiplyMatrices(matrixA, matrixB);
        expect(result).toEqual([[19, 22], [43, 50]]);
    });

    it("Должен выбрасывать ошибку при несовместимых размерах матриц", () => {
        const matrixA = [[1], [2]];
        const matrixB = [[3, 4], [5, 6]];

        expect(() => multiplyMatrices(matrixA, matrixB)).toThrowError("Невозможно перемножить матрицы: несовместимые размеры.");
    });

    it("Должен создавать матрицу поворота", () => {
        const matrix = createRotationMatrix(2, Math.PI / 2, 0, 1);

        // Избавляемся от float погрешностей
        const fixedFloat = matrix.map((row) => row.map((element) => parseFloat(element.toFixed(6))));
        expect(fixedFloat).toEqual([[0, -1], [1, 0]]);
    });

    it("Иницализирует декартовый вектор из матрицы-столбца", () => {
        const matrixColumn = [[1], [2]];
        const vector = new DecartVector(matrixColumn);
        expect(vector._x).toBe(1);
        expect(vector._y).toBe(2);
    });

    it("Иницализирует декартовый вектор с заданным углом и модулем", () => {
        const angle = Math.PI / 2;
        const mod = 2;
        const vector = new DecartVector(angle, mod);
        expect(vector.mod()).toBe(mod);
    });

    it("Складывает декартовые векторы", () => {
        const vector1 = new DecartVector([[1], [2]]);
        const vector2 = new DecartVector([[3], [4]]);
        const result = vector1.add(vector2.matrix());
        expect(result._x).toBe(4);
        expect(result._y).toBe(6);
    });

    it("Изменяет модуль вектора на указанную величину", () => {
        const vector = new DecartVector([[3], [4]]);
        vector.scaleModBy(2);
        const fixedFloat = parseFloat(vector.mod().toFixed(6));
        expect(fixedFloat).toBe(7);
    });

    it("Изменяет модуль вектора", () => {
        const vector = new DecartVector([[3], [4]]);
        const result = vector.scaleModTo(2);
        const fixedFloat = parseFloat(result.mod().toFixed(6));
        expect(fixedFloat).toBe(2);
    });

    it("Поворот вектора", () => {
        const matrix = [[3], [4]];
        const vector = new DecartVector(matrix);
        vector.rotate(Math.PI / 2);

        const fixedFloat = parseFloat(vector.mod().toFixed(6));
        expect(fixedFloat).toBe(5);
        expect(matrix).not.toBe(vector.matrix());
    });
});