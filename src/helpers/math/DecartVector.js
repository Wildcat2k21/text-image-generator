// Класс декартового вектора

import { multiplyMatrices, createRotationMatrix } from ".";

export default class DecartVector {
    /**
     * Конструктор класса DecartVector.
     * Если передан массив (матрица 2x1), интерпретируем его как вектор.
     * Если передано число, интерпретируем как угол в радианах и дополнительно может быть
     * передан модуль вектора.
     *
     * @param {Array|number} vectorOrAngle - Матрица 2x1 или угол в радианах.
     * @param {number} [mod=1] - Модуль вектора (используется при передаче угла).
     * @throws {Error} Если переданная матрица некорректна или значение не является числом.
     */
    constructor(vectorOrAngle, mod = 1) {
        // Если передана матрица (2x1)
        if (Array.isArray(vectorOrAngle)) {
            if (!DecartVector.IsVector(vectorOrAngle)) {
                throw new Error("Конструктор должен получать матрицу размером 2x1.");
            }
            this._x = vectorOrAngle[0][0];
            this._y = vectorOrAngle[1][0];
            this._rotated = 0;
            return;
        }
  
        // Если передан угол (число)
        if (typeof vectorOrAngle === "number" && Number.isFinite(vectorOrAngle)) {
            const normalizedVector = DecartVector.VectorFromAngle(vectorOrAngle, mod);
            this._x = normalizedVector[0][0];
            this._y = normalizedVector[1][0];
            return;
        }
  
        throw new Error("Конструктор должен получать либо матрицу размером 2x1, либо угол (число).");
    }
  
    get x_component(){
        return this._x;
    }

    get y_component(){
        return this._y;
    }

    /**
     * Возвращает вектор в виде матрицы 2x1.
     * @returns {number[][]} Матрица вектора.
     */
    matrix() {
        return [
            [this._x],
            [this._y]
        ];
    }
  
    /**
     * Изменяет модуль (длину) вектора, масштабируя его.
     * @param {number} mod - Новый модуль вектора.
     * @returns {number[][]} Новая матрица вектора после масштабирования.
     * @throws {Error} Если переданное значение не является конечным числом.
     */
    scaleModTo(mod) {
        if (typeof mod !== "number" || !Number.isFinite(mod)) {
            throw new Error("Переданное значение не является скалярным числом.");
        }
        // Нормируем вектор
        const normalizedVector = DecartVector.NormalizeVector(this.matrix());
        // Масштабирование: умножаем каждый элемент на скаляр
        this._x = normalizedVector[0][0] * mod;
        this._y = normalizedVector[1][0] * mod;
        return this;
    }
  
    /**
     * Поворачивает вектор на заданный угол (в радианах).
     * @param {number} angle - Угол поворота в радианах.
     * @returns {number[][]} Новая матрица вектора после поворота.
     * @throws {Error} Если переданное значение не является конечным числом.
     */
    rotate(angle) {
        if (typeof angle !== "number" || !Number.isFinite(angle)) {
            throw new Error("Переданное значение не является числом.");
        }
        const rotationMatrix = createRotationMatrix(2, angle - this._rotated, 0, 1);
        this._rotated = angle;

        // Функция multiplyMatrices должна быть доступна в вашем окружении
        const composition = multiplyMatrices(rotationMatrix, this.matrix());
        this._x = composition[0][0];
        this._y = composition[1][0];
        return this;
    }

    /**
     * Вычисляет модуль (длину) вектора.
     * @returns {number} Модуль вектора.
     */
    mod(){
        return DecartVector.VectorMod(this.matrix());
    }

    /**
     * Масштабирует вектор, прибавляя значение к модулю (длине) вектора.
     * @param {number} value - Значение, которое будет прибавлено к модулю вектора.
     * @returns {number[][]} Новая матрица вектора после масштабирования.
     */
    scaleModBy(value){
        if(typeof value !== "number" || !Number.isFinite(value)) {
            throw new Error("Значение не является корретным числом.");
        }

        return this.scaleModTo(this.mod() + value);
    }

    /**
     * Складывает переданный вектор с текущим.
     * @param {number[][]} matrix_vector - Вектор, который будет сложен.
     * @returns {number[][]} Матрица вектора после сложения.
     * @throws {Error} Если переданный вектор некорректен.
     */
    add(matrix_vector){
        if (!DecartVector.IsVector(matrix_vector)) {
            throw new Error("Вектор должен быть матрицей размером 2x1.");
        }

        return new DecartVector([
            [this._x + matrix_vector[0][0]],
            [this._y + matrix_vector[1][0]],
        ]);
    }

    /**
     * Прибавляет значение к x-компоненте вектора.
     * @param {number} value - Значение, которое будет прибавлено к x-компоненте.
     * @returns {number} Новое значение x-компоненты.
     * @throws {Error} Если переданное значение не является корретным числом.
     */
    addXcomponent(value){
        if(typeof value !== "number" || !Number.isFinite(value)) {
            throw new Error("Значение не является корретным числом.");
        }

        return this;
    }

    /**
     * Прибавляет значение к y-компоненте вектора.
     * @param {number} value - Значение, которое будет прибавлено к y-компоненте.
     * @returns {number} Новое значение y-компоненты.
     * @throws {Error} Если переданное значение не является числом.
     */
    addYcomponent(value){
        if(typeof value !== "number" || !Number.isFinite(value)) {
            throw new Error("Значение не является корретным числом.");
        }

        return this;
    }

    /**
     * Обновляет значение x-компоненты вектора.
     * @param {number} value - Новое значение x-компоненты.
     * @returns {number} Новое значение x-компоненты.
     * @throws {Error} Если переданное значение не является корректным числом.
     */
    updateXcomponent(value){
        if(typeof value !== "number" || !Number.isFinite(value)) {
            throw new Error("Значение не является корретным числом.");
        }

        return this;
    }

    /**
     * Обновляет значение y-компоненты вектора.
     * @param {number} value - Новое значение y-компоненты.
     * @returns {number} Новое значение y-компоненты.
     * @throws {Error} Если переданное значение не является корретным числом.
     */
    updateYcomponent(value){
        if(typeof value !== "number" || !Number.isFinite(value)) {
            throw new Error("Значение не является корретным числом.");
        }

        return this;
    }
  
    /**
     * Проверяет, является ли переданный массив вектором (матрицей 2x1 с числовыми значениями).
     * @param {any} matrix_vector - Проверяемое значение.
     * @returns {boolean} True, если это корректная матрица 2x1.
     */
    static IsVector(matrix_vector) {
        return (
            Array.isArray(matrix_vector) &&
            matrix_vector.length === 2 &&
            Array.isArray(matrix_vector[0]) &&
            Array.isArray(matrix_vector[1]) &&
            typeof matrix_vector[0][0] === "number" &&
            typeof matrix_vector[1][0] === "number"
        );
    }
  
    /**
     * Нормализует вектор (приводит к единичной длине).
     * @param {number[][]} matrix_vector - Вектор в виде матрицы 2x1.
     * @returns {number[][]} Нормализованный вектор.
     * @throws {Error} Если входной вектор некорректен.
     */
    static NormalizeVector(matrix_vector) {
        if (!DecartVector.IsVector(matrix_vector)) {
            throw new Error("Вектор должен быть матрицей размером 2x1.");
        }
        const mod = DecartVector.VectorMod(matrix_vector);
        if (mod === 0) {
            throw new Error("Невозможно нормализовать нулевой вектор.");
        }
        return [
            [matrix_vector[0][0] / mod],
            [matrix_vector[1][0] / mod]
        ];
    }
  
    /**
     * Вычисляет модуль (длину) вектора.
     * @param {number[][]} matrix_vector - Вектор в виде матрицы 2x1.
     * @returns {number} Модуль вектора.
     * @throws {Error} Если входной вектор некорректен.
     */
    static VectorMod(matrix_vector) {
        if (!DecartVector.IsVector(matrix_vector)) {
            throw new Error("Вектор должен быть матрицей размером 2x1.");
        }
        return Math.sqrt(matrix_vector[0][0] ** 2 + matrix_vector[1][0] ** 2);
    }
  
    /**
     * Создает нормированный вектор с заданным углом и модулем.
     * @param {number} angle - Угол в радианах.
     * @param {number} [mod=1] - Модуль вектора.
     * @returns {number[][]} Матрица вектора 2x1.
     * @throws {Error} Если переданные значения не являются числами.
     */
    static VectorFromAngle(angle, mod = 1) {
        if (typeof angle !== "number" || !Number.isFinite(angle) || typeof mod !== "number" || !Number.isFinite(mod)) {
            throw new Error("Угол или модуль не являются корректными числами.");
        }
        return [
            [Math.cos(angle) * mod],
            [Math.sin(angle) * mod]
        ];
    }
}
  