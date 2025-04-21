import { SheetType } from "../../components/P5_context2d/RenderList";
import { fontNames } from "../../utils/preloadFonts";
import { randomArrayElement } from "../../helpers/math";

export const handCase2 = {
    char_variation: {
        // Вариация матрицы трансформации для символов
        // Значения в % от ширины скетча
        // 0 - scale x
        // 1 - skew y
        // 2 - skew x
        // 3 - scale y
        transform: {
            scaleX:{
                from: 0.75,
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
                from: 0.75,
                to: 1.25
            }
        },
        // 4 - shift x
        // 5 - shift y
        translate: {
            shiftX: {
                from: 0,
                to: 0
            },
            shiftY: {
                from: 0,
                to: 0
            }
        },
        // 6 - rotate [from, to, add]
        rotate: {
            from: 0,
            to: 0,
        }
    },

    line_variation: {
        // Вариация трансформации для строк
        // Значения в % от ширины скетча
        // 0 - start
        // 1 - end
        // 2 - top
        // 3 - bottom
        // 4 - height
        transform: {
            start: {
                from: 15,
                to: 15
            },
            end: {
                from: 5,
                to: 5
            },
            top: {
                from: 5,
                to: 5
            },
            bottom: {
                from: 5,
                to: 5
            },
            height: {
                from: 5,
                to: 5
            }
        },
        // 5 - rotate
        rotate: {
            from: -Math.PI/128,
            to:  Math.PI/128
        }
    },
    // Параметры рендера листа
    renderListConfig: {
        sheetType: SheetType.GRID,
        background: "#DEDEDE",
        // параметры линий листа
        linesOptions: {
            size: 3.3783,
            strokeWeight: 0.25,
            color: "#4E98CE"
        },
        // Параметры линий полей листа
        borderLine: {
            pad: 13.5132,
            onLeft: true,
            color: "#C22929",
        },
    },

    // Название шрифта
    fontName: randomArrayElement(fontNames),
    // Базовый размер шрифта
    fontSize: 5,
    // Цвет текста
    textColor: "#00287A",
    // Текст для рендера
    renderText: "Hello world"
};