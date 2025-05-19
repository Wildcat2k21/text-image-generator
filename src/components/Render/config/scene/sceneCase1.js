import { Images, Models } from "@utils/preloadResources";
import { SheetType } from "@components/P5TextList/renderList";

export const sceneCase1 = () => ({
    title: "scene1",
    camera: {
        lookAt: {
            from: [0, 0, 0],
            to: [0, 0, 0]
        },
        targetList: 0, //0 - левый, 1 - правый //Переопределяется в config
        position: {
            from: [0, 0, 300],
            to: [0, 0, 400]
        },
        rotate: {
            from: [-Math.PI/25, -Math.PI/25, -Math.PI/25],
            to: [Math.PI/25, Math.PI/25, Math.PI/25]
        }
    },
    note: {
        translateXY: {
            from: [-5, -5],
            to: [5, 5]
        },
        rotateXY: 0,
        lists: {
            leftModelName: {
                cases: [
                    Models.LEFT_LIST1,
                    Models.LEFT_LIST2,
                    Models.LEFT_LIST3
                ]
            },
            rightModelName: {
                cases: [
                    Models.RIGHT_LIST1,
                    Models.RIGHT_LIST2,
                    Models.RIGHT_LIST3
                ]
            }
        },
        sheetType: SheetType.GRID, //Переопределяется в config
        renderTextOnList: 0, //0 - left, 1 - right //Переопределяется в config
        blurSecondList: 1
    },
    table: {
        texture: {
            cases: [
                Images.TABLE1,
                Images.TABLE2,
                Images.TABLE3,
                Images.TABLE4
            ]
        }
    },
    lightning: {
        ambient: {
            from: 130,
            to: 60
        },
        pointerLightRGB: {
            cases: [
                {
                    from: [225, 225, 255],
                    to: [255, 255, 150]
                },
                {
                    sameValuesFor: [0, 1, 2],
                    from: [255, 255, 255],
                    to: [100, 100, 100]
                }
            ]
        }
    },
    // Качество рендера листа
    listRenderBufferSize: 600
});