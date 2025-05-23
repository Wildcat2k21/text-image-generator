import { SheetType } from "@components/P5TextList/renderList";
import { fontNames } from "@utils/preloadFonts";
import { generateRandomText } from "@utils/generateRandomText";
import { 
    dictonaryRusLower,
    dictonaryLatLower,
    dictonaryNumbers 
} from "@constants/dictonaries";

import { randBetween } from "@helpers/math";

// Словарь для генерации текста
const unitDictonary = dictonaryRusLower + dictonaryLatLower + dictonaryNumbers;

export const handCase2 = () => ({
    title: "handcase2",
    renderProps: {
        // Вариация матрицы трансформации для символов
        charVariation: {
            // Значения в % от ширины скетча
            // 0 - scale x
            // 1 - skew y (Наклон по x)
            // 2 - skew x (Наклон по y)
            // 3 - scale y
            transform: {
                scaleX: {
                    from: 1,
                    to: 1.25
                },
                skewY: {
                    from: 0,
                    to: 0
                },
                skewX: {
                    from: 0,
                    to: 0
                },
                scaleY: {
                    from: 1,
                    to: 1.25
                }
            },
            // 4 - shift x
            // 5 - shift y
            translate: {
                shiftX: {
                    from: -0.25,
                    to: 0.25
                },
                shiftY: {
                    from: -0.25,
                    to: 0.25
                }
            },
            // 6 - Rotate
            rotate: {
                from: 0,
                to: 0,
            }
        },
        // Вариация трансформации для строк
        lineVariation: {
            // Значения в % от ширины скетча
            // 0 - start
            // 1 - end
            // 2 - top
            // 3 - bottom
            // 4 - height
            transform: { //Переопределяется в config
                start: 0,
                end: 0,
                top: 0,
                bottom: 0,
                height: 0
            },
            // 5 - rotate
            rotate: {
                from: 0,
                to: 0
            }
        }
    },
    // Параметры рендера листа
    listProps: {
        sheetType: SheetType.GRID, //Переопределяется в config
        background: "#DEDEDE",
        // параметры линий листа //Переопределяется в config
        linesOptions: {
            size: 3.03, //Линии - 3.9, Сетка - 3.03
            strokeWeight: 0.125,
            color: "#80aaff", //"#4E98CE"
        },
        // Параметры линий полей листа
        borderLine: {
            pad: 12.12,
            onLeft: true, //Переопределяется в config
            color: "#C22929",
        },
        blur: 0.5,
    },
    textProps: {
        fontName: {
            cases: [
                fontNames[0],
                fontNames[2],
                fontNames[6]
            ]
        },
        // Базовый размер шрифта
        fontSize: {
            from: 5,
            to: 5
        },
        // Цвет текста
        color: {
            from: [0, 40, 122, 200],
            to: [0, 40, 122, 75]
        },
        // Текст для рендера
        content: generateRandomText(unitDictonary, randBetween(0, 300, 0)),
        blur: 1
    }
});