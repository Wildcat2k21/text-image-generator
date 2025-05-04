
import { 
    SCENE_PARENT_ID,
    MANUSCRIPT_PARENT_ID,
    FILTER_PARENT_ID
} from "@constants/sketchSelectors";

import { generateImages, FORMAT_LIST } from "./helpers/generateImages";
import { pausablePromise } from "@utils/pausablePromise";

const MAX_IMAGES_PER_REQUEST = 10;

export function RenderController(processCallback) {
    this.init = async function(){
        this._$manuscript = document.querySelector("#" + MANUSCRIPT_PARENT_ID);
        this._$scene = document.querySelector("#" + SCENE_PARENT_ID);
        this._$filter = document.querySelector("#" + FILTER_PARENT_ID);
        this.renderIsStarted = false;

        // Инициируем подгрузку ресурсов
        if(!this._$manuscript._p5Fonts && !this._$scene._p5Resources){
            await this._$manuscript.init();
            await this._$scene.init();
        }

        this.generatorWithSources = (imagesCount, jpegComp, previewMode = false) => 
            generateImages(
                this._$manuscript,
                this._$scene,
                this._$filter,
                previewMode || false,
                imagesCount || 1,
                FORMAT_LIST.BLOB,
                jpegComp || 9
            );

        // Инициализируем промис для блокировки потока в случае паузы
        this.pauseRenderPromise = pausablePromise();
    };

    this.startRender = async function (renderOptions) {
        if(!this.renderIsStarted){
            this.renderIsStarted = true;
        }

        // Считаем количество итераций в зависимости от количества изображений
        const IMAGES_PER_REQUEST = renderOptions.amount > MAX_IMAGES_PER_REQUEST
            ? MAX_IMAGES_PER_REQUEST : renderOptions.amount;

        for(let i = 0; i < renderOptions.amount; i += IMAGES_PER_REQUEST){
            // Прерывание рендера
            if(!this.renderIsStarted) return false;

            // Отбработка паузы (Если будет вызван метод pauseRender)
            await this.pauseRenderPromise.waitIfPaused();

            // Генерируем изображения
            const images = await this.generatorWithSources(
                IMAGES_PER_REQUEST,
                renderOptions.jpegComp
            );

            // Вызываем callback для передачи промежуточного процесса
            await processCallback(images, i, renderOptions.amount);
        }

        // Выполнено
        processCallback([], renderOptions.amount, renderOptions.amount);
        this.renderIsStarted = false;
        return true;
    };

    this.stopRender = function () {
        if(this.renderIsStarted){
            this.renderIsStarted = false;
        }

        return this.renderIsStarted;
    };

    this.pauseRender = function () {
        if(this.renderIsStarted){
            this.pauseRenderPromise.pause();
        }
    };

    this.resumeRender = function () {
        if(this.renderIsStarted){
            this.pauseRenderPromise.resume();
        }
    };
}
