import { createRotationMatrix, multiplyMatrices } from "../../helpers/math";

export function contextTransform({transform, translate, rotate}, translateX, translateY) {
    // Для applyMatrix(a, b, c, d, e, f);
    // a - scaleX - коэффициент изменения ширины
    // b - skewY - перенос по оси y (1 влево -1 вправо)
    // c - skewX - перенос по оси x (1 влево -1 вправо)
    // d - scaleY - коэффициент изменения высоты
    // e - trnalsate_x - центрирование по оси x
    // f - trnalsate_y - центрирование по оси y
    // 
    // Пример
    // | a c e |
    // | b d f |
    // | 0 0 1 |

    // a - f параметры
    const { 
        scaleX,
        skewY,
        skewX,
        scaleY,
    } = transform;

    const {
        shiftX,
        shiftY,
    } = translate;

    // угол матрицы поврота
    const angle = rotate;

    // Матрица преобразования
    const transformMatrix = [
        [scaleX, skewX],
        [skewY, scaleY]
    ];

    // Определяем матрицу поворота второго порядка
    const rotationMatrix = createRotationMatrix(2, angle, 0, 1);

    // Выполняем композицию, добавляем e, f параметры смещения
    const composition = multiplyMatrices(transformMatrix, rotationMatrix).flat()
        .concat([translateX + shiftX, translateY + shiftY]);

    // Возвращем угол и композицию
    return [composition, angle];
}