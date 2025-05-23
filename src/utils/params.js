import { randBetween, randomArrayElement } from "@helpers/math";

function generate(spec) {
    const result = {};
    for (const key in spec) {
        result[key] = generateParams(spec[key]);
    }
    return result;
}
  
export function generateParams(descriptor) {
    // 1) Обработка cases
    if (descriptor && descriptor.cases !== undefined) {
        // Выбираем случайный элемент из descriptor.cases
        const element = randomArrayElement(descriptor.cases);
        // Рекурсивно генерируем значение для выбранного элемента
        return generateParams(element);
    }
  
    // 2) Обработка числовых/массивных диапазонов from–to
    if (descriptor 
        && descriptor.from !== undefined 
        && descriptor.to   !== undefined
    ) {
        const { from, to, sameValuesFor } = descriptor;
  
        // 2.a) Если from/to — массивы
        if (Array.isArray(from) && Array.isArray(to)) {
            const length = from.length;
            const values = new Array(length);
  
            if (Array.isArray(sameValuesFor) && sameValuesFor.length > 0) {
                // Генерируем единое значение для всех индексов из sameValuesFor
                const idx0 = sameValuesFor[0];
                const commonVal = randBetween(from[idx0], to[idx0]);
                sameValuesFor.forEach(i => {
                    values[i] = commonVal;
                });
                // Остальные индексы — свои независимые значения
                for (let i = 0; i < length; i++) {
                    if (!sameValuesFor.includes(i)) {
                        values[i] = randBetween(from[i], to[i]);
                    }
                }
            } else {
                // Простая генерация поэлементно
                for (let i = 0; i < length; i++) {
                    values[i] = randBetween(from[i], to[i]);
                }
            }
  
            return values;
        }
  
        // 2.b) Обычные числовые from/to
        return randBetween(descriptor.from, descriptor.to);
    }
  
    // 3) Если это вложенный объект со своими спецификациями
    if (descriptor 
        && typeof descriptor === "object" 
        && !Array.isArray(descriptor)
    ) {
        return generate(descriptor);
    }
  
    // 4) Примитивы (string, number, boolean) или любые другие значения — копируем как есть
    return descriptor;
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
