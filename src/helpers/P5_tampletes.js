// Модуль шаблонов для p5-скетчей

import { A_FORMAT_WIDTH, A_FORMAT_HEIGHT } from "../constants/P5_sketch_size_formats";

// Шаблон для скетча context-2d
export function context2d_setup_template(canvasParent){
    this.setup = () => {
        const canvas = this.createCanvas(A_FORMAT_WIDTH, A_FORMAT_HEIGHT);
        canvas.parent(canvasParent); // вставляем в DOM-элемент
        this.noLoop(); // чтобы не вызывался draw постоянно
    };
};