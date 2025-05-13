import { createRenderChars } from "./createRenderChars";
import { charsRenderMetrics, linesRenderMetrics, logMetrics } from "@helpers/metricsCalculation";
import { renderList } from "./renderList";
import { relativeToInParcent } from "@helpers/math";
import { transformRelativeParams } from "./helpers";
// import { roundAndScaleMetrics } from "@helpers/propareRenderData";
import { generateParams } from "@utils/params";
import { fontNames } from "@utils/preloadFonts";

export function P5renderText(textRenderConfig) {
    const p5 = this._p5Instance;

    // Получаем преобразованный из % в пиксели для рендера объект параметров
    const applyRelativeScaling = (value) => relativeToInParcent(value, p5.width);
    const transformedParams = transformRelativeParams(textRenderConfig, applyRelativeScaling);

    const {
        renderProps,
        listProps,
        textProps
    } = transformedParams;

    const {
        fontSize,
        fontName,
        color: textColor,
        content,
    } = generateParams(textProps);

    // Получаем шрифт
    const font = this._p5Fonts.getCurrent(fontName);

    // Настройка текста
    p5.textSize(fontSize);
    p5.textFont(font);

    // Рендер листа
    renderList.call(p5, generateParams(listProps));

    // Применяем размытие
    if(listProps.blur > 0){
        p5.filter(p5.BLUR, listProps.blur);
    }

    // Подготовка символов к рендеру
    const [renderChars, renderLines] = createRenderChars.call(p5, content, renderProps);

    // Метрики
    const averageCharMetrics = charsRenderMetrics.call(p5, renderChars, fontName);
    const averageLineMetrics = linesRenderMetrics.call(p5, renderLines);

    const metricsData = {
        averageCharMetrics: averageCharMetrics.map(val => parseFloat(val.toFixed(3))),
        averageLineMetrics: averageLineMetrics.map(val => parseFloat(val.toFixed(3))),
        fontCatOutput: fontNames.map((name) => name === fontName ? 1 : 0)
    };

    // Округление и масштабирование
    // const roundedAndScaledMetrics = roundAndScaleMetrics(metricsData);

    // Консольный вывод метрик
    // logMetrics(metricsData);
     
    // console.log("=========== обработанные =========");
    // logMetrics(roundedAndScaledMetrics);

    // Метод для получения метрик текста из родителя
    this.getTextMetrics = () => metricsData;

    // Цвет текста
    p5.fill(...textColor);

    // Рендер символов
    for (const { char, transform } of renderChars) {
        p5.push();
        p5.applyMatrix(...transform);
        p5.text(char, 0, 0);
        p5.pop();
    }

    // Применяем размытие текста
    if(textProps.blur > 0){
        p5.filter(p5.BLUR, textProps.blur);
    }
}