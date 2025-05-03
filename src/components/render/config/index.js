// Группа конфигов подчерка
import { handCase1 } from "./handwrite/handCase1";
import { handCase2 } from "./handwrite/handCase2";
import { handCase3 } from "./handwrite/handCase3";
import { handCase4 } from "./handwrite/handCase4";

// Группа конфигов сцены
import { sceneCase1 } from "./scene/sceneCase1";
import { sceneCase2 } from "./scene/sceneCase2";
import { sceneCase3 } from "./scene/sceneCase3";
import { sceneCase4 } from "./scene/sceneCase4";

export const cases = {
    list: [{
        handwrite: [
            handCase1,
        ],
        scene: [
            sceneCase1
        ]
    },
    {
        handwrite: [
            handCase2,
        ],
        scene: [
            sceneCase2
        ]
    },
    {
        handwrite: [
            handCase3,
        ],
        scene: [
            sceneCase3
        ]
    },
    {
        handwrite: [
            handCase4,
        ],
        scene: [
            sceneCase4
        ]
    }]
};