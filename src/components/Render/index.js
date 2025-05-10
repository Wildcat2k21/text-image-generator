// Компоненты управления темой на странице предпросмотра

import { Component } from "@utils/Component.js";
import { RenderController } from "./RenderController.js";
import { RenderBtnController } from "./helpers/renderBtnController.js";
import { getRenderOptions, getPreviewOptions } from "@helpers/getOptions";
import { FILTER_PARENT_ID } from "@constants/sketchSelectors.js";
import {
    progressCallbackFactory,
    handleStopRender,
    orbitControlHandler
} from "./helpers/other.js";
 
export default function RenderOptions() {
    return Component({
        html: /*html*/`
            <div class="render-options">
                <h3 class="header h3-header">Создание датасета</h3>

                <fieldset class="render-options__fieldset fieldset">                    
                    <label class="render-options__label label">
                        Количество экземпляров
                        <input type="number" min="1" max="1000000" value="1000" id="data-amount-input">
                    </label>
                    <label class="render-options__label label">
                        Качество сжатия формата JPEG
                        <input type="number" min="1" max="10" value="9" id="data-quality-input">
                    </label>
                </fieldset>

                <h4 class="header h4-header render-options__header">Линия прогресса</h4>
                <div class="progress-bar">
                    <div class="progress-bar__fill">
                        <span class="progress-bar__percent">0%</span>
                    </div>
                </div>

                <div class="render-options__btn-container">
                    <button class="render-options__button" id="render-btn">Создать датасет</button>
                    <button class="render-options__button render-options__button--disabled" id="prevent-render-btn">Остановить</button>
                </div>

                <h3 class="header h3-header render-options__header">Примечание</h3>
                <p class="render-options__text">
                    💡 Подробная инструкция по использованию проекта представлена в 
                    <code class="render-options__code">README.MD</code>.
                </p>
            </div>
        `,
        setup: async function(){
            // Инициализируем состояние из localStorage для amount
            const $amountInput = this.querySelector("#data-amount-input");
            $amountInput.value = localStorage.getItem("amount") || 10;

            $amountInput.addEventListener("change", (e) => {
                localStorage.setItem("amount", e.target.value);
            });

            // Инициализируем состояние из localStorage для quality
            const $qualityInput = this.querySelector("#data-quality-input");
            $qualityInput.value = localStorage.getItem("compress") || 9;

            $qualityInput.addEventListener("change", (e) => {
                localStorage.setItem("compress", e.target.value);
            });

            // === контроль рендера ===

            // Получаем коллбэк прогресса
            const progressCallback = progressCallbackFactory.call(this);

            // Инициализируем контроллер рендера
            const renderController = new RenderController(progressCallback);
            await renderController.init();

            // Делаем превью рендера
            await renderController.generatorWithSources(
                1,
                getRenderOptions().compress,
                getPreviewOptions().orbit,
            ); //1 картинка, качество по умолчанию

            const filterController = document.querySelector(`#${FILTER_PARENT_ID}`).filterController;

            // Делаем ререндер для чекбокса (Контроль вращения камерой)
            const $orbitCheckbox = document.querySelector("#webgl-orbit-checkbox");
            orbitControlHandler($orbitCheckbox, renderController, filterController);

            // Получаем конопку рендера
            const $renderBtn = this.querySelector("#render-btn");

            // Инициализируем контроллер кнопки рендера
            RenderBtnController.call(this, $renderBtn, renderController, (renderOptions) => {
                progressCallback([], 0, renderOptions.amount);
                $preventRenderBtn.classList.toggle("render-options__button--disabled", false);
                $orbitCheckbox.checked && ($orbitCheckbox.checked = false);
                filterController.looped && filterController.stopLoop();
            });

            // Получаем кнопку остановки рендера
            const $preventRenderBtn = this.querySelector("#prevent-render-btn");
            handleStopRender($preventRenderBtn, $renderBtn, renderController);
        }
    });
}
