// Компоненты управления темой на странице предпросмотра

import { Component } from "../utils/Component.js";
 
export default function PreviewOptions() {
    return Component({
        html: /*html*/ `
            <div class="preview-options">
                <h3 class="header h3-header">Предпросмотр</h3>
                <fieldset class="preview-options__fieldset fieldset">
                    <!-- orbitContoller сцены webGL -->
                    <label class="preview-options__orbit-label label" title="(Будет примене при следующем рендере)">
                        Контроль вращения камеры 3D сцены
                        <input class="preview-options__orbit-checkbox" type="checkbox" id="webgl-orbit-checkbox">
                    </label>
                </fieldset>
            </div>
        `,
        setup: function(){
            // Инициализируем состояние из localStorage для orbit (Вращение камеры мышью)
            const $orbitCheckbox = this.querySelector("#webgl-orbit-checkbox");
            $orbitCheckbox.checked = localStorage.getItem("orbit") === "true";

            $orbitCheckbox.addEventListener("change", (e) => {
                localStorage.setItem("orbit", e.target.checked);
            });
        }
    });
}
