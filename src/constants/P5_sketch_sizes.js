// Модуль с константами размера скетчей P5

// --------------- context 2d ------------------

// Базовый размер 400 в ширину, при заданном коэффициенте масштабирования 1
export const A_FORMAT_WIDTH = 500;

// Формат foolio/2 = 20.5/16.5
export const A_FORMAT_ASPECT = 20.5/16.5;

// Math.SQRT2 - отношение сторон формата А
export const A_FORMAT_HEIGHT = A_FORMAT_WIDTH * A_FORMAT_ASPECT;

// --------------- context webgl ------------------

// Базовый размер высоты снимка (При вертикальной съемке)
export const PHONE_CAMERA_WIDTH = 1000;

export const PHOME_CAMERA_ASPECT = 4/3;

// Базовый размер ширины снимка (При вертикальной съемке)
export const PHONE_CAMERA_HEIGHT = PHONE_CAMERA_WIDTH * PHOME_CAMERA_ASPECT;