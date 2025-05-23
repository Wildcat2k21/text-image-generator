// Компонент скетча для рендера рукописного текста на сцену webGL
import { Component } from "@utils/Component";
import { preloadResources } from "@utils/preloadResources";
import { initSketch } from "./initSketch";
import { P5renderScene } from "./render";
import { SCENE_PARENT_ID } from "@constants/sketchSelectors";

export default function Scene() {
    return Component({
        html: /*html*/ `
        <div class="p5-context-webgl" id="${SCENE_PARENT_ID}">
            <h4 class="header h4-header p5-context-webgl__header">Формат 4:3 просмотра</h4>
        </div>
    `,
        setup: function(){
            this.init = async () => {
                if(!this._p5Resources){
                    this._p5Resources = await preloadResources();
                }
            };

            this.renderScene = function(variationParams, orbitControl = false){
                // Удаляем предыдущий скетч
                if(this._p5Instance){
                    this._p5Instance.remove();
                }

                // Повторно инициализируем скетч (Параметры вариации и функция рендера вынесены в компонент инициализации)
                // Так как скетч одноразовый
                const p5Instance = initSketch.call(this, variationParams, P5renderScene, orbitControl);
                this._p5Instance = p5Instance;

                return p5Instance.canvas;
            };
        }
    });
}
