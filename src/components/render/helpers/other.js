import { dataset } from "@api/index.js";
import { getRenderOptions } from "@helpers/getOptions";
import { generateParams } from "@utils/params";
import { randomArrayElement } from "@helpers/math";
import { cases } from "../config/index";

export const handleStopRender = ($preventRenderBtn, $renderBtn, renderController) => {
    $preventRenderBtn.addEventListener("click", () => {
        renderController.stopRender();
        $renderBtn.textContent = "Создать датасет";
        $renderBtn.style.backgroundColor = "#98e674";
        $renderBtn.pauseFlag = false;

        // Делаем кнопку неактивной
        $preventRenderBtn.classList.add("render-options__button--disabled");
    });
};

export function progressCallbackFactory(){
    return async (imageDataChunk, currentStep, totalSteps) => {
        const percent = (currentStep / totalSteps) * 100;
        this.querySelector(".progress-bar__percent").textContent = `${percent.toFixed(2)}%`;
        this.querySelector(".progress-bar__fill").style.width = `${percent}%`;
    
        if(imageDataChunk.length){
            try{
                await dataset.sendImages(imageDataChunk);
            }
            catch(err){
                confirm(err);
            }
        }
    };
};

export const getFilterParams = (caseGroup) => {
    const randFulterSubCase = randomArrayElement(caseGroup.filters);
    const randomFilterCase = randFulterSubCase();

    // Вызыварем рендер со случайными кейсом параметров фильтров
    return generateParams(randomFilterCase);
};

export const getSceneParams = (caseGroup) => {
    const randSceneSubCase = randomArrayElement(caseGroup.scene);
    const randomSceneCase = randSceneSubCase();

    // Вызыварем рендер со случайными кейсом параметров сцены
    return generateParams(randomSceneCase);
};

export const getHandCaseParamsRaw = (caseGroup) => {
    const randHandSubCase = randomArrayElement(caseGroup.handwrite);
    return randHandSubCase();
};

export const orbitControlHandler = ($orbitCheckbox, renderController, filterController) => {
    $orbitCheckbox.addEventListener("change", async ({ target }) => {
        await renderController.generatorWithSources(
            1,
            getRenderOptions().compress,
            target.checked
        ); //1 картинка, качество по умолчанию

        // Превью случайного фильтра c автообновлением
        if(target.checked){
            const randCase = randomArrayElement(cases.list);
            const filterParams = getFilterParams(randCase);
            filterController.startLoop(undefined, filterParams);
        }
        else{
            filterController.stopLoop();
        }
    });
};