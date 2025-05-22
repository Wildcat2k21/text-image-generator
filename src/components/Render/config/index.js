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

// Группа конфигов сцены (Нормальная фотография)
import { sceneCase1 } from "./scene/sceneCase1";

// Группа конфигов сцены (Не тот маштаб)
import { sceneCase2 } from "./scene/sceneCase2";

// Группа конфигов сцены (Поворот на 90 или -90)
import { sceneCase3 } from "./scene/sceneCase3";

// Группа конфигов сцены (Крутой поворот)
import { sceneCase4 } from "./scene/sceneCase4";

// Группа конфигов сцены (Тусклый свет)
import { sceneCase5 } from "./scene/sceneCase5";

// Текст с коротким заполнением
import { handCase2 } from "./handwrite/handCase2";

// Фильтры
import { filterCase1 } from "./filters/filterCase1";

// Сильный блюр
import { filterCase2 } from "./filters/filterCase2";

// Блюр для зума
import { filterCase3 } from "./filters/filterCase3";

// 1
const normalTextCase = function(){
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [1, 0, 0, 0, 0, 0, 0],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase1(),
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

// 2
const shortTextCase = () => {
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [0, 1, 0, 0, 0, 0, 0],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase2(),
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
 
// 3
const badZoom = () => {
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [0, 0, 1, 0, 0, 0, 0],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase1(),
            ]);

            return applyHandcaseParams(handcaseParams, renderParamsRange.handcase);
        },
        scene: () => {
            const sceneParams = randomArrayElement([
                sceneCase2(),
            ]);

            return applySceneParams(sceneParams, renderParamsRange.scene);;
        },
        filters: () => {
            const filterParams = randomArrayElement([
                filterCase3()
            ]);

            return filterParams;
        }
    };
};

// 4
const badOrient = () => {
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [0, 0, 0, 1, 0, 0, 0],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase1(),
            ]);

            return applyHandcaseParams(handcaseParams, renderParamsRange.handcase);
        },
        scene: () => {
            const sceneParams = randomArrayElement([
                sceneCase3(),
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

// 5
const badAngle = () => {
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [0, 0, 0, 0, 1, 0, 0],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase1(),
            ]);

            return applyHandcaseParams(handcaseParams, renderParamsRange.handcase);
        },
        scene: () => {
            const sceneParams = randomArrayElement([
                sceneCase4(),
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

// 6
const forceBlur = () => {
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [0, 0, 0, 0, 0, 1, 0],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase1(),
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
                filterCase2()
            ]);

            return filterParams;
        }
    };
};

// 7
const glimmer = function(){
    const renderListType = randomListType();
    const renderLeft = randLeftSideRender();

    // Получаем параметры листа
    const renderParamsRange = useHandcaseListOptions(renderListType, renderLeft);

    return {
        outputs: [0, 0, 0, 0, 0, 0, 1],
        handwrite: () => {
            const handcaseParams = randomArrayElement([
                handCase1(),
            ]);

            return applyHandcaseParams(handcaseParams, renderParamsRange.handcase);
        },
        scene: () => {
            const sceneParams = randomArrayElement([
                sceneCase5(),
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
        normalTextCase,
        normalTextCase,
        normalTextCase,
        shortTextCase,
        badZoom,
        badOrient,
        badAngle,
        forceBlur,
        glimmer
    ]
};