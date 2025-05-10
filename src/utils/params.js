import { randBetween, randomArrayElement } from "@helpers/math";

/**
 * Генерирует параметры на основе переданного объекта вариации.
 *
 * Обрабатывает объекты вида { from, to } для генерации случайных чисел или массивов,
 * перечисляемые массивы (выбор одного значения), а также вложенные объекты.
 *
 * @param {Object|Array|number|string} variation - Объект вариации или примитивное значение.
 * @returns {Object|number|string} Сгенерированные параметры.
 */
export function generateParams(variation) {
    if (variation && typeof variation === "object") {
        // Обработка { from, to }
        if ("from" in variation && "to" in variation) {
            const from = variation.from;
            const to = variation.to;

            if (Array.isArray(from) && Array.isArray(to)) {
                return from.map((f, i) => randBetween([f, to[i]]));
            }

            return randBetween([from, to]);
        }

        // Если это массив примитивов — выбираем случайный элемент
        if (Array.isArray(variation)) {
            const isPrimitiveArray = variation.every(v =>
                ["string", "number", "boolean"].includes(typeof v)
            );

            if (isPrimitiveArray) {
                return randomArrayElement(variation);
            }

            // Иначе — массив сложных объектов (можно доработать при необходимости)
            return variation.map(item => generateParams(item));
        }

        // Рекурсивно проходим по объекту
        const result = {};
        for (const key in variation) {
            result[key] = generateParams(variation[key]);
        }

        return result;
    }

    // Примитивы — возвращаем как есть
    return variation;
}

/**
 * Рекурсивно преобразует значения объекта на основе схемы преобразования.
 *
 * @param {Object} obj - Исходный объект.
 * @param {Object} transformMap - Схема, где указаны поля для преобразования (true или объект).
 * @param {Function} transformFn - Функция преобразования значений.
 * @returns {Object} - Новый объект с преобразованными значениями.
 */
export function transformObjectValues(obj, transformMap, transformFn) {
    if (typeof obj !== "object" || obj === null) return obj;

    const result = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        const value = obj[key];
        const map = transformMap?.[key];

        if (map === true) {
            if (typeof value === "number") {
                result[key] = transformFn(value);
            } else if (value?.from !== undefined && value?.to !== undefined) {
                result[key] = {
                    from: transformFn(value.from),
                    to: transformFn(value.to),
                };
            } else {
                result[key] = value; // что-то неизвестное, оставим как есть
            }
        } else if (typeof map === "object") {
            result[key] = transformObjectValues(value, map, transformFn);
        } else {
            result[key] = value;
        }
    }

    return result;
}
