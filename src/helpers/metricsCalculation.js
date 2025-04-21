// Модуль для расчета метрик рендуриемого текста в скетче Manuscript
import {  amplifyAngle, parcentOf } from "./math";

// Получение точной высоты символа через canvas API
const getCharH = (p5, char) => {
    let metrics = p5.drawingContext.measureText(char);
    let ascent = metrics.actualBoundingBoxAscent;
    let descent = metrics.actualBoundingBoxDescent;

    // Возвращаем высоту символа
    return ascent + descent;
};

// Функция для расчета метрик линий
export function linesRenderMetrics(metrics, consoleTableLog = false) {
    const p5 = this;

    // Обсолютные метрики не требует преобразования в % от ширины скетча
    // Относительные метрики задаются в px и требуют преобразования

    // Обсолютные метрики
    // 1. b - Среднее направоение поворота
    // 2. c - Степень поворота

    // Относительные метрики
    // 1. a - Средняя ширина строки
    // 2. b - Средняя высота строки

    const line_metrics = [0, 0];
    const line_relative_metrics = [0, 0];

    // Считаем метрики для строк
    metrics.forEach(metric => {
        const { height, rotated, width } = metric;
    
        // a - Среднее направоение поворота
        line_metrics[0] += rotated;
       
        // b - Степень поворота
        line_metrics[1] += amplifyAngle(rotated, 64);

        // --- Относительные метрики ---

        // 1. a - Средняя ширина строки
        line_relative_metrics[0] += width;

        // 2. b - Средняя высота строки
        line_relative_metrics[1] += height;
    });

    // Высчитываем среднее значение обсолютных метрик
    const absolute_metrics_av = line_metrics.map((val) => val / metrics.length);;
    
    // Преобразуем относительые метрики величину в % от ширины скетча и считаем среднее
    const relative_metrics_av = line_relative_metrics
        .map((val) => parcentOf(val / metrics.length, p5.width));

    // Объединяем обсолютные и относительные метрики
    const allMetrics = [...relative_metrics_av, ...absolute_metrics_av, ];

    if (consoleTableLog) {
        // Выводим метрики
        logLineMetrics(allMetrics);
    }

    return allMetrics;
}

// Функция для расчета метрик символов
export function charsRenderMetrics(charsRenderArray, consoleTableLog = false){
    const p5 = this;

    // Обсолютные метрики не требует преобразования в % от ширины скетча
    // Относительные метрики задаются в px и требуют преобразования

    // Обсолютные метрики
    // 1. a - Средний наклон символов по x
    // 2. b - Средний налкон символов по y
    // 3. c - Среднее направление поворота символов
    // 4. d - Степень поворота символов
    // 
    // Относительные метрики
    // 1. a - Средняя ширина символов в тексте
    // 2. b - Средняя высота символов в тексте
    // 3. c - Смещение символов по x
    // 4. d - Смещение символов по y
    const char_metrics = [0, 0, 0, 0];
    const char_relative_metrics = [0, 0, 0, 0];

    // Считаем метрики символов, которые уже переданы
    charsRenderArray.forEach((metric) => {
        const { 
            char,
            transform,
            rotated,
            shifted_baseline_offset_x,
            shifted_baseline_offset_y,
        } = metric;

        // a - наклон символов по x по модулю
        char_metrics[0] += Math.abs(transform[2]);

        // b - наклон символов по y по модулю
        char_metrics[1] += Math.abs(transform[1]);

        // c - направление поворота символов
        char_metrics[2] += rotated;

        // d - степень поворота (от 0 до 1 макс)
        char_metrics[3] += amplifyAngle(rotated, 1.25);

        // --- Относительные метрики ---

        // a - ширина символа
        char_relative_metrics[0] += (p5.textWidth(char) * transform[0]);

        // b - высота символа
        char_relative_metrics[1] += (getCharH(p5, char) * transform[3]);

        // c - Смещение символа по x по модулю
        char_relative_metrics[2] += Math.abs(shifted_baseline_offset_x);

        // d - Смещение символа по y по модулю
        char_relative_metrics[3] += Math.abs(shifted_baseline_offset_y);
    });

    // Высчитываем среднее значение обсолютных метрик
    const absolute_metrics_av = char_metrics
        .map(val => val / charsRenderArray.length);

    // Преобразуем относительые метрики величину в % от ширины скетча и считаем среднее
    const relative_metrics_av = char_relative_metrics
        .map(val => parcentOf(val / charsRenderArray.length, p5.width));


    // Объединяем метрики
    const allMetrics = [...relative_metrics_av, ...absolute_metrics_av];

    if (consoleTableLog) {
        // Вывод метрик символов
        logCharMetrics(allMetrics);
    }

    // Объединяем метрики в один массив
    return allMetrics;
};

// Вывод метрик символов
const logCharMetrics = (averageCharMetrics) => {
    const charMetricsTable = [
        { name: "char_w", value: averageCharMetrics[0] },
        { name: "char_h", value: averageCharMetrics[1] },
        { name: "char_shift_x", value: averageCharMetrics[2] },
        { name: "char_shift_y", value: averageCharMetrics[3] },
        { name: "char_skew_x", value: averageCharMetrics[4] },
        { name: "char_skew_y", value: averageCharMetrics[5] },
        { name: "char_rotated", value: averageCharMetrics[6] },
        { name: "char_rotate_power", value: averageCharMetrics[7] },
    ];

    // eslint-disable-next-line no-console
    console.table(charMetricsTable);
};

// Вывод метрик линий
const logLineMetrics = (averageLineMetrics) => {
    const lineMetricsTable = [
        { name: "line_w", value: averageLineMetrics[0] },
        { name: "line_h", value: averageLineMetrics[1] },
        { name: "line_rotated", value: averageLineMetrics[2] },
        { name: "line_rotated_power", value: averageLineMetrics[3] },
    ];

    // eslint-disable-next-line no-console
    console.table(lineMetricsTable);
};
