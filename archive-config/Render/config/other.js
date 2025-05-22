import { SheetType } from "@components/P5TextList/renderList";
import { generateParams } from "@utils/params";
import { randBetween } from "@helpers/math";
import { fontNames } from "@utils/preloadFonts";
import { randomArrayElement } from "../../../helpers/math";
import fontsOptions from "./fonstOptions.json";

export const useHandcaseListOptions = (sheetType, leftList = true) => {
    let options = {
        handcase: {},
        scene: {}
    };

    // Параметры рендера левого листа
    if(leftList){
        options.handcase = {
            transformList: {
                start: {
                    from: 15,
                    to: 15
                },
                end: {
                    from: 3,
                    to: 7
                },
                top: {
                    from: 8,
                    to: 20
                },
                bottom: {
                    from: 3,
                    to: 7
                },
                height: {
                    from: 0,
                    to: 2
                }
            },
            borderLineOnLeft: true,
        };

        options.scene = {
            targetList: 0,
            renderTextOnList: 0
        };
    };

    // Параметры ренедра правого листа
    if(!leftList){
        options.handcase = {
            transformList: {
                start: {
                    from: 3,
                    to: 7
                },
                end: {
                    from: 15,
                    to: 15
                },
                top: {
                    from: 8,
                    to: 20
                },
                bottom: {
                    from: 3,
                    to: 7
                },
                height: {
                    from: 0,
                    to: 3
                }
            },
            borderLineOnLeft: false,
        };

        options.scene = {
            targetList: 1,
            renderTextOnList: 1
        };
    };

    if(sheetType === SheetType.GRID){
        options.handcase.lineSize = 3.03;
    };

    if(sheetType === SheetType.LINES){
        options.handcase.lineSize = 3.9;
    };

    options.handcase.sheetType = sheetType;
    options.scene.sheetType = sheetType;
    return options;
};

export const randomListType = () => {
    return generateParams({
        cases: [
            SheetType.GRID,
            SheetType.LINES,
        ]
    });
};

export const randLeftSideRender = () => {
    return generateParams({
        renderOnLeftList: {
            cases: [
                true,
                false
            ]
        }
    }).renderOnLeftList;
};

export const applyHandcaseParams = (handcaseParams, listParams) => {
    const newParams = structuredClone(handcaseParams);
    newParams.renderProps.lineVariation.transform = listParams.transformList;
    newParams.listProps.sheetType = listParams.sheetType;
    newParams.listProps.linesOptions.size = listParams.lineSize;
    newParams.listProps.borderLine.onLeft = listParams.borderLineOnLeft;

    const fontName = randomArrayElement(fontNames);
    newParams.textProps.fontName = fontName;

    // Получаем параметры наклона шрифта
    const fontSkewX = -fontsOptions[fontName].skewY;

    if(handcaseParams.title === "handcase1"){
        //дополнительные параметры вариации

        // Вариация наклона
        const skewCoef = randBetween(-1.7, 1.7);
        const skewCoef2 = randBetween(0, 0.3);
        newParams.renderProps.charVariation.transform.skewY.from = skewCoef - skewCoef2 + fontSkewX;
        newParams.renderProps.charVariation.transform.skewY.to = skewCoef + skewCoef2 + fontSkewX;

        // Вариация ширины и высоты
        const widthCoef = randBetween(1.05, 1.2);
        const widthCoef2 = randBetween(0, 0.3);
        newParams.renderProps.charVariation.transform.scaleX.from = widthCoef - widthCoef2;
        newParams.renderProps.charVariation.transform.scaleX.to = widthCoef + widthCoef2;

        const heightCoef = randBetween(1.05, 1.2);
        const heightCoef2 = randBetween(0, 0.3);
        newParams.renderProps.charVariation.transform.scaleY.from = heightCoef - heightCoef2;
        newParams.renderProps.charVariation.transform.scaleY.to = heightCoef + heightCoef2;

        // Вариация наклона строки (Несимметричное рассеивание, с поравкой на rotLineCoef2)
        const rotLineCoef = randBetween(-Math.PI/16, Math.PI/16);
        const rotLineCoef2 = randBetween(0, Math.PI/64);
        newParams.renderProps.lineVariation.rotate.from = rotLineCoef - rotLineCoef2;
        newParams.renderProps.lineVariation.rotate.to = rotLineCoef + rotLineCoef2;

        const shiftMaxModXY = 2; //сдесь диапозон по модулю 2k т.к рассеивание симметричное относительно 0

        // Вариация смещения от базовой линии по x
        const shiftXCoefMod = randBetween(0, shiftMaxModXY);
        newParams.renderProps.charVariation.translate.shiftX.from = -shiftXCoefMod;
        newParams.renderProps.charVariation.translate.shiftX.to = shiftXCoefMod;

        // Вариация смещения от базовой линии по y
        const shiftYcoefMod = randBetween(0, shiftMaxModXY);
        newParams.renderProps.charVariation.translate.shiftY.from = -shiftYcoefMod;
        newParams.renderProps.charVariation.translate.shiftY.to = shiftYcoefMod;

        const lineHeightMaxMod = 7;
        const compLineHCoef = 3;

        // Вариация высоты строки (Полностью переопределяется)
        const lineHeightCoefMod = randBetween(0, lineHeightMaxMod) + compLineHCoef;
        newParams.renderProps.lineVariation.transform.height.from = lineHeightCoefMod;
        newParams.renderProps.lineVariation.transform.height.to = lineHeightCoefMod;

        // Ширина строки
        const lineXWidthStart = randBetween(0, 20);
        const lineXWidthEnd = randBetween(0, 20);

        const lineXWidthStart2 = randBetween(0, 10);
        const lineXWidthEnd2 = randBetween(0, 10);

        newParams.renderProps.lineVariation.transform.start.from += (lineXWidthStart - lineXWidthStart2);
        newParams.renderProps.lineVariation.transform.start.to += (lineXWidthStart + lineXWidthStart2);
        
        newParams.renderProps.lineVariation.transform.end.from += (lineXWidthEnd - lineXWidthEnd2);
        newParams.renderProps.lineVariation.transform.end.to += (lineXWidthEnd + lineXWidthEnd2);
    };

    if(handcaseParams.title === "handcase2"){
        //дополнительные параметры вариации

        // Вариация наклона
        const skewCoef = randBetween(-1, 1);
        const skewCoef2 = randBetween(0, 0.3);
        newParams.renderProps.charVariation.transform.skewY.from = skewCoef - skewCoef2 + fontSkewX;
        newParams.renderProps.charVariation.transform.skewY.to = skewCoef + skewCoef2 + fontSkewX;

        // Вариация ширины и высоты
        const widthCoef = randBetween(1.05, 1.2);
        const widthCoef2 = randBetween(0, 0.1);
        newParams.renderProps.charVariation.transform.scaleX.from = widthCoef - widthCoef2;
        newParams.renderProps.charVariation.transform.scaleX.to = widthCoef + widthCoef2;

        const heightCoef = randBetween(1.05, 1.2);
        const heightCoef2 = randBetween(0, 0.1);
        newParams.renderProps.charVariation.transform.scaleY.from = heightCoef - heightCoef2;
        newParams.renderProps.charVariation.transform.scaleY.to = heightCoef + heightCoef2;

        // Вариация наклона строки (Несимметричное рассеивание, с поравкой на rotLineCoef2)
        const rotLineCoef = randBetween(-Math.PI/32, Math.PI/32);
        const rotLineCoef2 = randBetween(0, Math.PI/64);
        newParams.renderProps.lineVariation.rotate.from = rotLineCoef - rotLineCoef2;
        newParams.renderProps.lineVariation.rotate.to = rotLineCoef + rotLineCoef2;

        const shiftMaxModXY = 1; //сдесь диапозон по модулю 2k т.к рассеивание симметричное относительно 0

        // Вариация смещения от базовой линии по x
        const shiftXCoefMod = randBetween(0, shiftMaxModXY);
        newParams.renderProps.charVariation.translate.shiftX.from = -shiftXCoefMod;
        newParams.renderProps.charVariation.translate.shiftX.to = shiftXCoefMod;

        // Вариация смещения от базовой линии по y
        const shiftYcoefMod = randBetween(0, shiftMaxModXY);
        newParams.renderProps.charVariation.translate.shiftY.from = -shiftYcoefMod;
        newParams.renderProps.charVariation.translate.shiftY.to = shiftYcoefMod;

        const lineHeightMaxMod = 7;
        const compLineHCoef = 3;

        // Вариация высоты строки (Полностью переопределяется)
        const lineHeightCoefMod = randBetween(0, lineHeightMaxMod) + compLineHCoef;
        newParams.renderProps.lineVariation.transform.height.from = lineHeightCoefMod;
        newParams.renderProps.lineVariation.transform.height.to = lineHeightCoefMod;

        // Ширина строки
        // const lineXWidthStart = randBetween(0, 20);
        // const lineXWidthEnd = randBetween(0, 20);

        // const lineXWidthStart2 = randBetween(0, 10);
        // const lineXWidthEnd2 = randBetween(0, 10);

        // newParams.renderProps.lineVariation.transform.start.from += (lineXWidthStart - lineXWidthStart2);
        // newParams.renderProps.lineVariation.transform.start.to += (lineXWidthStart + lineXWidthStart2);
        
        // newParams.renderProps.lineVariation.transform.end.from += (lineXWidthEnd - lineXWidthEnd2);
        // newParams.renderProps.lineVariation.transform.end.to += (lineXWidthEnd + lineXWidthEnd2);
    };

    return newParams;
};

export const applySceneParams = (sceneParams, sceneListParams) => {
    const newParams = structuredClone(sceneParams);
    newParams.camera.targetList = sceneListParams.targetList;
    newParams.note.renderTextOnList = sceneListParams.renderTextOnList;
    newParams.note.sheetType = sceneListParams.sheetType;
    return newParams;
};
