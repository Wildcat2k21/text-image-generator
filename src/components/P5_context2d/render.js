import { createRenderChars } from "./createRenderChars.js";
import { charsRenderMetrics, linesRenderMetrics } from "../../helpers/metricsCalculation.js";
import { renderList } from "./renderList.js";
import { randBetween, relativeToInParcent } from "../../helpers/math/index.js";
import { transformRelativeParams } from "./helpers";

export function P5renderText(textRenderConfig) {
    const p5 = this._p5Instance;

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
    p5.textSize(randBetween(Object.values(fontSize)));
    p5.textFont(font);

    // Рендер листа
    renderList.call(p5, renderListConfig);

    // Подготовка символов к рендеру
    const [renderChars, renderLines] = createRenderChars.call(p5, renderText, char_variation, line_variation);

    // Метрики
    const averageCharMetrics = charsRenderMetrics.call(p5, renderChars, false); //returns averageCharMetrics
    const averageLineMetrics = linesRenderMetrics.call(p5, renderLines, false); //returns averageLineMetrics

    // Метод для получения метрик текста из родителя
    this.getTextMetrics = () => ({averageCharMetrics, averageLineMetrics});

    // Цвет текста
    p5.fill(textColor);

    // Рендер символов
    for (const { char, transform } of renderChars) {
        p5.push();
        p5.applyMatrix(...transform);
        p5.text(char, 0, 0);
        // p5.applyMatrix(...transform.slice(0, 4), p5.width/2 , p5.height/2);
        // p5.text(char, -p5.textWidth(char)/2, -p5.textAscent()/2 + 11);
        p5.pop();
    }
}