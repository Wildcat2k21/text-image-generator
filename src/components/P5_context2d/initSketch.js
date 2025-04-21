import p5 from "p5";
import { A_FORMAT_WIDTH, A_FORMAT_HEIGHT } from "../../constants/P5_sketch_sizes";

export function initSketch (variationParams, renderFunction) {
    return new p5((sketch) => {
        sketch.setup = () => {
            const canvas = sketch.createCanvas(A_FORMAT_WIDTH, A_FORMAT_HEIGHT);
            canvas.parent(this); // вставляем в DOM-элемент
            sketch.background(220); // Дефолтная серая тема
            sketch.noLoop(); // Предотвращаем бесконечную анимацию
        };

        // Используем установленные шрифты "Родителя"
        const paramsWithFont = {...variationParams, font: this._p5Fonts.getCurrent(variationParams.fontName)};

        // Очищаем канвас перед рендером
        // sketch.clear = () => sketch.background(220);

        sketch.draw = () => renderFunction.call(sketch, paramsWithFont);

        // Перерисовыем скетч
        sketch.redraw();
    });
}