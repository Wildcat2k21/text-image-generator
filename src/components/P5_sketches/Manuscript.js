import { Component } from "../../utils/Component.js";
import { context2d_setup_template } from "../../helpers/P5_tampletes.js";
import { preloadFonts } from "../../helpers/preloadFonts.js";
import p5 from "p5";

function P5sketchController({ text, font }) {
    const sketchElem = this;

    // Рисуем текст
    const customFont = sketchElem.p5Fonts[font];
    sketchElem.p5.textFont(customFont);
    sketchElem.p5.text(text, 200, 100);
}

export default function Manuscript() {
    return Component({
        html: /*html*/ `
        <div class="p5-context-2d"></div>
    `,
        setup: async (elem) => {
            // Добавляем контроллер для скетча
            elem.manuscriptSketch = P5sketchController.bind(elem);
            elem.p5Fonts = await preloadFonts();

            // Сохраняем p5-инстанс в DOM-элементе
            elem.p5 = new p5((sketch) => {
                // Новый p5 скетч в instance mode
                context2d_setup_template.call(sketch, elem);
            });

            // Пример стороннего вызова, скажем, через секунду:
            setTimeout(() => {
                elem.p5.background(220);
                // Первичная отрисовка
                elem.manuscriptSketch({ text: "Привет из Montekky!", font: "montekky" });
            }, 1000);
        }
    });
}
