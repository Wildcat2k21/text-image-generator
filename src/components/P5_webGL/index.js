// Компонент скетча для рендера рукописного текста на сцену webGL
import { Component } from "../../utils/component";
import { preloadResources } from "../../utils/preloadResources";
import { initSketch } from "./helpers";
import { P5renderScene } from "./render";
import { SCENE_PARENT_ID } from "../../constants/sketch_selectors";

// Для предворительной проверки рендера
import { sceneCase1 } from "../../genconfig/scene/sceneCase1";
import { generateParams } from "../../utils/params";

export default function Scene() {
    return Component({
        html: /*html*/ `
        <div class="p5-context-webgl" id="${SCENE_PARENT_ID}"></div>
    `,
        setup: async (elem) => {
            elem._p5Resources = await preloadResources();

            elem.renderScene = function(variationParams){
                if(this.p5){
                    this.p5.remove();
                }

                const p5Instance = initSketch.call(this, variationParams, P5renderScene);
                this.p5 = p5Instance;
            };

            // Для предворительной проверки рендера
            const params = generateParams(sceneCase1);
            elem.renderScene(params);
        }
    });
}
