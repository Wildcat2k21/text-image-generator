// Компонент скетча с рукописным текстом
import { preloadFonts } from "@utils/preloadFonts";
import { Component } from "@utils/Component";
import { MANUSCRIPT_PARENT_ID } from "@constants/sketchSelectors";
import { initSketch } from "./initSketch";
import { P5renderText } from "./render";

export default function Manuscript() {
    return Component({
        html: /*html*/ `
        <div class="p5-context-2d" id="${MANUSCRIPT_PARENT_ID}">
            <h4 class="header h4-header p5-context-2d__header">Лист формата Folio/2</h4>
        </div>
    `,
        setup: function(){
            this.init = async () => {
                // Добавляем шрифты и инициализируем скетч в instance mod
                if(!this._p5Fonts && !this._p5Instance){
                    this._p5Fonts = await preloadFonts();
                    this._p5Instance = initSketch.call(this);
                }
            };

            this.renderText = function renderText(variationParams){
                // Используем установленные шрифты "Родителя"
                this._p5Instance.draw = () => P5renderText.call(this, variationParams);

                // Перерисовыем скетч
                this._p5Instance.redraw();

                return this._p5Instance.canvas;
            };
        }
    });
}
