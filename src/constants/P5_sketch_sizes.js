// Модуль с константами размера скетчей P5

// --------------- context 2d ------------------

// Базовый размер 400 в ширину, при заданном коэффициенте масштабирования 1
export const A_FORMAT_WIDTH = 200;

// Math.SQRT2 - отношение сторон формата А
export const A_FORMAT_HEIGHT = A_FORMAT_WIDTH * Math.SQRT2;

// --------------- context webgl ------------------

// Базовый размер высоты снимка (При вертикальной съемке)
export const PHONE_CAMERA_WIDTH = 180;

// Базовый размер ширины снимка (При вертикальной съемке)
export const PHONE_CAMERA_HEIGHT = PHONE_CAMERA_WIDTH * 4 / 3;