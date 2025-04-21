// Компонент скетча с рукописным текстом
import { preloadFonts } from "../../utils/preloadFonts";
import { Component } from "../../utils/component";
import { MANUSCRIPT_PARENT_ID } from "../../constants/sketch_selectors";
import { initSketch } from "./initSketch";
import { P5renderText } from "./render";

// Для предворительной проверки рендера
import { handCase1 } from "../../genconfig/handwrite/handCase1";


export default function Manuscript() {
    return Component({
        html: /*html*/ `
        <div class="p5-context-2d" id="${MANUSCRIPT_PARENT_ID}"></div>
    `,
        setup: async (elem) => {
            // Добавляем шрифты
            elem._p5Fonts = await preloadFonts();

            elem.renderText = function renderText(variationParams){
                // Новый p5 скетч в instance mode
                // Сохраняем p5-инстанс в DOM-элементе
                this._p5Instance = initSketch.call(this, variationParams, P5renderText);
            };

            // Проверка рендера
            // variationParams не требует предворительного преобразования как webGL
            // Все преобразования выполняются для каждого отдельного символа
            elem.renderText(handCase1);
        }
    });
}
