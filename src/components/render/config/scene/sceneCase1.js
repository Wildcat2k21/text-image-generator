import { Images, Models } from "@utils/preloadResources";
import { SheetType } from "@components/P5_context2d/renderList";

export const sceneCase1 = () => ({
    camera: {
        //no change
        lookAt: {
            from: [0, 0, 0.1],
            to: [0, 0, 0.1]
        },
        targetList: 1, //0 - left, 1 - right
        //180 min 300 max
        position: {
            from: [0, 0, 180],
            to: [0, 0, 180]
        },
        //max mod Math.PI/5
        rotate: {
            from: [-Math.PI/200, -Math.PI/200, -Math.PI/200],
            to: [Math.PI/200, Math.PI/200, Math.PI/200]
        }
    },
    note: {
        // scale: 1,
        //max mod 3
        translateXY: {
            from: [-0, -0],
            to: [0, 0]
        },
        //max mod Math.PI/10
        rotateXY: {
            from: -Math.PI/200,
            to: Math.PI/200
        },
        lists: {
            leftModelName: [
                Models.LEFT_LIST1,
                Models.LEFT_LIST2,
                Models.LEFT_LIST3
            ],
            rightModelName: [
                Models.RIGHT_LIST1,
                Models.RIGHT_LIST2,
                Models.RIGHT_LIST3
            ]
        },
        listTypes: SheetType.GRID, 
        renderTextOnList: 1 //0 - left, 1 - right
    },
    table: {
        texture: [
            Images.TABLE1,
            Images.TABLE2,
            Images.TABLE3,
            Images.TABLE4
        ]
    },
    lightning: {
        ambient: {
            from: 80,
            to: 120
        },
        pointerLightRGB: {
            from: [255, 255, 130],
            to: [255, 255, 180]
        }
    },
    // Качество рендера листа
    listRenderBufferSize: 600
});