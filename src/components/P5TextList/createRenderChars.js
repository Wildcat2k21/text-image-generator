// Модуль разбивает текст на символы, позволяя генерировать текст со случайными параметрами
import { A_FORMAT_WIDTH, A_FORMAT_HEIGHT } from "@constants/sketchSizes";
import { contextTransform } from "./contextTransform.js";
import DecartVector from "@helpers/math/DecartVector.js";
import { generateParams } from "@utils/params.js";

// Создает объект для рендера текста посимвольно
// Шрифт и размер должны быть установлены до вызова данный функции в скетче
export function createRenderChars(text, char_variation, line_variation){
    const p5 = this;

    // Получаем случайные величины из диапозона параметров линий и символов
    let lineParams = generateParams(line_variation);
    let charParams = generateParams(char_variation);

    let lineTransform = lineParams.transform;

    // Получаем случайные параметры границ строк
    let lineStart = lineTransform.start;
    let lineEnd = lineTransform.end;
    let lineTop = lineTransform.top;
    let lineBottom = lineTransform.bottom;
    let lineHeight = lineTransform.height;

    let lineRotate = lineParams.rotate;

    // Добавляем значение наклона строки к наклону символа
    charParams.rotate -= lineRotate;

    // Вектор строки и вектор линии
    // 
    // 1. Сложение вектора высоты строки (lineHeightVector) с вектором линиии текста (lineTextVector)
    // Дает результирующий вектор, который определяет позицию символа.
    // 2. Управляя поворотом lineTextVector можно задавать наклон строки в радианах
    // Базовая линия рассеивания символов по горизонтале при этом также будет преобразована

    // Примечание для обучения нейросетью
    // 
    // 1. Для обучения нейросети рекомендуется передавать симметричное рассеиваное по горизонтали и вертикале для символов
    // К примеру: -2, 2. Чтобы уровень базовой не был смещен центром рассеивания
    // 2. Не рекомендуется передавать параметр рассеивания по вертикале и горизонтали больше или равной средней высоте символов
    // или ширине пробела (Нейросеть будет путать параметры рассеивания по вертикале и горизонтали с высотой строки и шириной символа пробела)

    // // Вектор линии текста
    // const linePadLeftVector = new DecartVector([
    //     [lineStart],
    //     [0]
    // ]);

    // Вектор высоты строки
    const lineHeightVector = new DecartVector([
        [0],
        [lineTop]
    ]);

    // Вектор линии текста
    const lineTextVector = new DecartVector([
        [lineStart],
        [0]
    ]);

    // Поворачиваем вектор строки
    lineTextVector.rotate(lineRotate);

    // Объект символов для рендера
    const charsRenderArray = [];

    // Объект для хранения метрик строк
    const linesRenderArray = [];

    for(let char of text.split("")){
        // Композиция вектора линии и вектора строки
        const lineH_lineText_compos = lineHeightVector.add(lineTextVector.matrix());

        // Получаем компоненты
        const lineX = lineH_lineText_compos.x_component;
        const lineY = lineH_lineText_compos.y_component;

        const linePosIsReachTheBottom = () =>
            (lineY + lineHeight > A_FORMAT_HEIGHT - lineBottom);

        if(linePosIsReachTheBottom()){
            break;
        }
        
        // Обновляем преобразование символов
        charParams = generateParams(char_variation);

        // Добавляем значение наклона строки к наклону символа
        charParams.rotate -= lineRotate;

        const [transform, rotated] = contextTransform(charParams, lineX, lineY);

        // Измеряем ширину символа
        const charWidth = p5.textWidth(char) * transform[0];

        // Определеляем смещение относительно базовой линии
        const shifted_baseline_offset_x = transform[4] - lineX;
        const shifted_baseline_offset_y = transform[5] - lineY;

        const charIsReachTheLineEnd = () => 
            (lineX + charWidth > A_FORMAT_WIDTH - lineEnd);

        const isNewLineChar = () =>
            char === "\n";

        // Текст в границах строки, потом добавить варициции отсутутов
        if(!charIsReachTheLineEnd() && !isNewLineChar()){
            // Сохраняем метрики и параметры трансформации символов
            const charRenderItem = {
                char,
                transform,
                rotated,
                shifted_baseline_offset_x,
                shifted_baseline_offset_y,
            };
    
            // Добавляем новый символ
            charsRenderArray.push(charRenderItem);

            // Обновляем положение символа в строке
            lineTextVector.scaleModBy(charWidth);
        }
        else {
            // Сохраняем метрики строки
            linesRenderArray.push({
                rotated: lineRotate,
                height: lineHeight,
                width: lineTextVector.mod() - lineStart,
            });

            lineHeightVector.scaleModBy(lineHeight);
            lineTextVector.scaleModTo(lineStart);

            // Получаем случайные величины из диапозона параметров линий и символа
            lineParams = generateParams(line_variation);
            lineTransform = lineParams.transform;

            // Получаем случайные параметры линий
            lineStart = lineTransform.start;
            lineEnd = lineTransform.end;
            lineTop = lineTransform.top;
            lineBottom = lineTransform.bottom;
            lineHeight = lineTransform.height;

            // Обновляем поворот строки
            lineRotate = lineParams.rotate;

            // Поворачиваем строку
            lineTextVector.rotate(lineRotate);
        }
    }

    // Возвращаем массив рендера символов
    return [charsRenderArray, linesRenderArray];
}
  