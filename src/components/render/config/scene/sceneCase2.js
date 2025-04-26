export const sceneCase2 = () => ({
    camera: {
        //no change
        lookAt: {
            from: [0, 0, 0.1],
            to: [0, 0, 0.1]
        },
        //180 min 300 max
        position: {
            from: [0, 0, 180],
            to: [0, 0, 300]
        },
        //max mod Math.PI/5
        rotate: {
            from: [-Math.PI/20, -Math.PI/20, -Math.PI/20],
            to: [Math.PI/20, Math.PI/20, Math.PI/20]
        }
    },
    list: {
        //max mod 3
        translateXY: {
            from: [-3, -3],
            to: [3, 3]
        },
        //max mod Math.PI/10
        rotateXY: {
            from: -Math.PI/50,
            to: Math.PI/50
        }
    },
    table: {
        texture: [
            "texture1",
            "texture2",
            "texture3"
        ]
    },
    lightning: {
        ambient: {
            from: 100,
            to: 200
        },
        pointerLightRGB: {
            from: [255, 255, 130],
            to: [255, 255, 255]
        }
    },
    // Качество рендера листа
    listRenderBufferSize: 600
});