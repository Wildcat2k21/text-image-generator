import { SheetType } from "@components/P5TextList/renderList";
import { generateParams } from "@utils/params";
// import { randBetween } from "@helpers/math";
// import { fontNames } from "@utils/preloadFonts";
// import { randomArrayElement } from "../../../helpers/math";
// import fontsOptions from "./fonstOptions.json";

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
                    from: 3,
                    to: 10
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
                    from: 3,
                    to: 10
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
    
    return newParams;
};

export const applySceneParams = (sceneParams, sceneListParams) => {
    const newParams = structuredClone(sceneParams);
    newParams.camera.targetList = sceneListParams.targetList;
    newParams.note.renderTextOnList = sceneListParams.renderTextOnList;
    newParams.note.sheetType = sceneListParams.sheetType;

    if(sceneParams.title === "scene3" && newParams.camera.targetList === 0) {
        const negRotFlag = generateParams({
            cases: [
                true,
                false
            ]
        });

        let [px, py, pz] = generateParams(newParams.camera.position);
        let [lx, ly, lz] = generateParams(newParams.camera.lookAt);

        newParams.camera.rotate = negRotFlag ? generateParams({
            from: [-Math.PI/10, -Math.PI/10, -Math.PI/2],
            to: [Math.PI/10, Math.PI/10, -Math.PI/2]
        }) : generateParams({
            from: [-Math.PI/10, -Math.PI/10, Math.PI/2],
            to: [Math.PI/10, Math.PI/10, Math.PI/2]
        });

        px += negRotFlag ? 50 : 50;
        lx += negRotFlag ? 50 : 50;

        py += negRotFlag ? 50 : -40;
        ly += negRotFlag ? 50 : -40;

        newParams.camera.position = [px, py, pz];
        newParams.camera.lookAt = [lx, ly, lz];
    };

    if(sceneParams.title === "scene3" && newParams.camera.targetList === 1) {
        const negRotFlag = generateParams({
            cases: [
                true,
                false
            ]
        });

        let [px, py, pz] = generateParams(newParams.camera.position);
        let [lx, ly, lz] = generateParams(newParams.camera.lookAt);

        newParams.camera.rotate = negRotFlag ? generateParams({
            from: [-Math.PI/10, -Math.PI/10, -Math.PI/2],
            to: [Math.PI/10, Math.PI/10, -Math.PI/2]
        }) : generateParams({
            from: [-Math.PI/10, -Math.PI/10, Math.PI/2],
            to: [Math.PI/10, Math.PI/10, Math.PI/2]
        });

        px += negRotFlag ? -40 : -40;
        lx += negRotFlag ? -40 : -40;

        py += negRotFlag ? -40 : 50;
        ly += negRotFlag ? -40 : 50;

        newParams.camera.position = [px, py, pz];
        newParams.camera.lookAt = [lx, ly, lz];
    };

    return newParams;
};
