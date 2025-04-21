import { createRenderChars } from "./CreateRenderChars.js";
import { charsRenderMetrics, linesRenderMetrics } from "../../helpers/metricsCalculation.js";
import { renderList } from "./RenderList.js";
import { relativeToInParcent } from "../../helpers/math/index.js";
import { transformRelativeParams } from "./helpers";

export function P5renderText(textRenderConfig) {
    const p5 = this;

    // Получаем преобразованный из % в пиксели для рендера объект параметров
    const applyRelativeScaling = (value) => relativeToInParcent(value, p5.width);
    const transformedParams = transformRelativeParams(textRenderConfig, applyRelativeScaling);

    const {
        font,
        fontSize,
        textColor,
        renderText,
        char_variation,
        line_variation,
        renderListConfig,
    } = transformedParams;

    // Настройка текста
    p5.textSize(fontSize);
    p5.textFont(font);

    // Рендер листа
    renderList.call(p5, renderListConfig);

    // Подготовка символов к рендеру
    const [renderChars, renderLines] = createRenderChars.call(p5, renderText, char_variation, line_variation);

    // Метрики
    charsRenderMetrics.call(p5, renderChars, true); //returns averageCharMetrics
    linesRenderMetrics.call(p5, renderLines, true); //returns averageLineMetrics

    // Цвет текста
    p5.fill(textColor);

    // Рендер символов
    for (const { char, transform } of renderChars) {
        p5.push();
        p5.applyMatrix(...transform);
        p5.text(char, 0, 0);
        p5.pop();
    }
}