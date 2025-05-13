// Модуль для расчета метрик рендуриемого текста в скетче Manuscript
import {  amplifyAngle, parcentOf } from "./math";
import fontsOptions from "@src/components/Render/config/fonstOptions.json";

// Получение точной высоты символа через canvas API
const getCharH = (p5, char) => {
    let metrics = p5.drawingContext.measureText(char);
    let ascent = metrics.actualBoundingBoxAscent;
    let descent = metrics.actualBoundingBoxDescent;

    // Возвращаем высоту символа
    return ascent + descent;
};

// Функция для расчета метрик линий
export function linesRenderMetrics(metrics) {
    const p5 = this;

    // Обсолютные метрики не требует преобразования в % от ширины скетча
    // Относительные метрики задаются в px и требуют преобразования

    // Обсолютные метрики
    // 1. b - Среднее направление поворота
    // 2. c - Степень поворота

    // Относительные метрики
    // 1. a - Средняя ширина строки
    // 2. b - Средняя высота строки

    const line_metrics = [0, 0];
    const line_relative_metrics = [0, 0];

    // Считаем метрики для строк
    metrics.forEach(metric => {
        const { height, rotated, width } = metric;
    
        // a - Среднее направление поворота
        line_metrics[0] += rotated;
       
        // b - Степень поворота
        line_metrics[1] += amplifyAngle(rotated, 10);

        // --- Относительные метрики ---

        // 1. a - Средняя ширина строки
        line_relative_metrics[0] += width;

        // 2. b - Средняя высота строки
        line_relative_metrics[1] += height;
    });

    // Высчитываем среднее значение обсолютных метрик
    const absolute_metrics_av = line_metrics.map((val) => val / metrics.length);

    // Усиление угла с направление поворота
    absolute_metrics_av[1] *= Math.sign(absolute_metrics_av[0]);
    absolute_metrics_av.splice(0, 1);
    
    // Преобразуем относительые метрики величину в % от ширины скетча и считаем среднее
    const relative_metrics_av = line_relative_metrics
        .map((val) => parcentOf(val / metrics.length, p5.width));

    // Объединяем обсолютные и относительные метрики
    return [...relative_metrics_av, ...absolute_metrics_av, ];;
}

// Функция для расчета метрик символов
export function charsRenderMetrics(charsRenderArray, fontName){
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
    const char_metrics = [0]; //[0, 0, 0, 0]
    const char_relative_metrics = [0, 0, 0, 0];

    // Считаем метрики символов, которые уже переданы
    charsRenderArray.forEach((metric) => {
        const { 
            char,
            transform,
            // rotated,
            shifted_baseline_offset_x,
            shifted_baseline_offset_y,
        } = metric;

        // a - наклон символов по x по модулю
        char_metrics[0] += transform[2];

        // b - наклон символов по y по модулю
        // char_metrics[1] += Math.abs(transform[1]);

        // // c - направление поворота символов
        // char_metrics[2] += rotated;

        // // d - степень поворота (от 0 до 1 макс)
        // char_metrics[3] += amplifyAngle(rotated, 1.25);

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

    // Получаем параметры наклона шрифта
    const fontSkewX = fontsOptions[fontName].skewY;

    // Высчитываем среднее значение обсолютных метрик
    const absolute_metrics_av = char_metrics
        .map(val => val / charsRenderArray.length);

    // Исправление метрики наклона шрифта
    absolute_metrics_av[0] += fontSkewX;

    // Преобразуем относительые метрики величину в % от ширины скетча и считаем среднее
    const relative_metrics_av = char_relative_metrics
        .map(val => parcentOf(val / charsRenderArray.length, p5.width));

    // Объединяем метрики в один массив
    return [...relative_metrics_av, ...absolute_metrics_av];;
};

// Предпросмотр метрик в консоли
export const logMetrics = ({averageCharMetrics, averageLineMetrics, fontCatOutput}) => {
    const charMetricsTable = [
        { name: "char-width", value: averageCharMetrics[0] },
        { name: "char-height", value: averageCharMetrics[1] },
        { name: "char-offset-x", value: averageCharMetrics[2] },
        { name: "char-offset-y", value: averageCharMetrics[3] },
        { name: "char_skew_x", value: averageCharMetrics[4] },
        // { name: "char_skew_y", value: averageCharMetrics[5] },
        // { name: "char_rotated", value: averageCharMetrics[6] },
        // { name: "char_rotate_power", value: averageCharMetrics[7] },
    ];

    const lineMetricsTable = [
        { name: "line-width", value: averageLineMetrics[0] },
        { name: "line-height", value: averageLineMetrics[1] },
        { name: "line-rotated-power", value: averageLineMetrics[2] },
        { name: "font-output", value: fontCatOutput }
    ];

    // eslint-disable-next-line no-console
    console.log("Метрики символов:");
    // eslint-disable-next-line no-console
    console.table(charMetricsTable.concat(lineMetricsTable));

    // // eslint-disable-next-line no-console
    // console.log("Метрики строк:");
    // // eslint-disable-next-line no-console
    // console.table(lineMetricsTable);
};
