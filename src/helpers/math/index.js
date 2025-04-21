// Модуль вспомогательных математических функций

/**
 * Перемножает две матрицы A и B.
 * @param {number[][]} A - Первая матрица (размер m x n).
 * @param {number[][]} B - Вторая матрица (размер n x p).
 * @returns {number[][]} Результирующая матрица (размер m x p).
 * @throws {Error} Если количество столбцов в A не равно количеству строк в B.
 */
export function multiplyMatrices(A, B) {
    const rowsA = A.length;
    const colsA = A[0].length;
    const rowsB = B.length;
    const colsB = B[0].length;
  
    if (colsA !== rowsB) {
        throw new Error("Невозможно перемножить матрицы: несовместимые размеры.");
    }
  
    // Инициализация результирующей матрицы нулями
    const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
  
    // Вычисление произведения матриц
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
  
    return result;
}

/**
 * Транспонирует матрицу, меняя местами строки и столбцы.
 * @param {number[][]} matrix - Исходная матрица для транспонирования.
 * @returns {number[][]} Транспонированная матрица.
 */
export function transposeMatrix(matrix) {
    // Проверка: пуста ли матрица
    if (!matrix || matrix.length === 0) return [];
  
    // Транспонирование: меняем строки и столбцы местами
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const transposed = [];
  
    for (let j = 0; j < cols; j++) {
        transposed[j] = [];
        for (let i = 0; i < rows; i++) {
            transposed[j][i] = matrix[i][j];
        }
    }
  
    return transposed;
}

/**
 * Создает матрицу поворота в n-мерном пространстве.
 *
 * @param {number} n - Размерность пространства (n ≥ 2).
 * @param {number} theta - Угол поворота в радианах.
 * @param {number} i - Первый индекс оси (0 ≤ i < n).
 * @param {number} j - Второй индекс оси (0 ≤ j < n, j ≠ i).
 * @returns {number[][]} Матрица поворота размером n x n.
 * @throws {Error} Если индексы осей некорректны.
 */
export function createRotationMatrix(n, theta, i, j) {
    if (n < 2) {
        throw new Error("Размерность пространства должна быть не менее 2.");
    }
    if (i < 0 || i >= n || j < 0 || j >= n || i === j) {
        throw new Error("Индексы осей должны быть различными и находиться в пределах от 0 до n-1.");
    }
  
    // Инициализация единичной матрицы
    const matrix = Array.from({ length: n }, (_, row) =>
        Array.from({ length: n }, (_, col) => (row === col ? 1 : 0))
    );
  
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
  
    // Обновление элементов для поворота в плоскости (i, j)
    matrix[i][i] = cosTheta;
    matrix[i][j] = -sinTheta;
    matrix[j][i] = sinTheta;
    matrix[j][j] = cosTheta;
  
    return matrix;
}

/**
 * Генерирует случайное число в диапазоне [from, to].
 *
 * @param {number[]} [from, to, add = 0] - Диапазон со смещением add, в котором будет сгенерировано случайное число.
 * @returns {number} Случайное число в диапазоне [from, to, add] со смещением add.
 */
export const randBetween = ([from, to, add = 0]) => {
    return from + Math.random() * (to - from) + add;
};

/**
 * Возвращает случайный элемент из массива (Литерала);
 *
 * @param {Array} arr - Массив значений
 * @returns {*} Один случайный элемент
 */
export function randomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Усиливает значения малых уголов с помощью гиперболического тангенса.
 * Значение в верхнем пределе - 1, в нижнем пределе - 0
 * 
 * @param {number} angle - Значение угла для уселения.
 * @param {number} k - Коэфициент пропорциональности усиления малых значений угла.
 * @returns {number} Увеличенный малый угол.
 */
export const amplifyAngle = (angle, k) => {
    return Math.abs(Math.tanh(k * angle));
};

/**
 * Пересчитывает значение value, учитывая relative как процент от value.
 * @param {number} value - Значение, которое нужно пересчитать.
 * @param {number} relative - Процент от value, на который value будет умножено.
 * @returns {number} Пересчитанное значение.
 */
export const relativeToInParcent = (value, relative) => {
    return value * (relative / 100);
};

export const parcentOf = (value, relative) => {
    return (value / relative) * 100;
};
