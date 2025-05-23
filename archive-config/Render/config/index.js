import {
    useHandcaseListOptions,
    randomListType,
    randLeftSideRender,
    applyHandcaseParams,
    applySceneParams,
} from "./other";

import { randomArrayElement } from "@helpers/math";

// Группа конфигов подчерка
import { handCase1 } from "./handwrite/handCase1";
import { handCase2 } from "./handwrite/handCase2";

// Группа конфигов сцены (Нормальная фотография)
import { sceneCase1 } from "./scene/sceneCase1";

// Фильтры
import { filterCase1 } from "./filters/filterCase1";

const rightFuncRepeat = function(){
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [1, 0, 0, 0, 0, 0],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase1(),
                handCase2(),
                handCase2()
            ]);

            return applyHandcaseParams(handcaseParams, renderParamsRange.handcase);
        },
        scene: () => {
            const sceneParams = randomArrayElement([
                sceneCase1(),
            ]);

            return applySceneParams(sceneParams, renderParamsRange.scene);;
        },
        filters: () => {
            const filterParams = randomArrayElement([
                filterCase1()
            ]);

            return filterParams;
        }
    };
};

export const renderConfig = {
    // Нормальный фотографии
    groups: [
        rightFuncRepeat,
    ]
};