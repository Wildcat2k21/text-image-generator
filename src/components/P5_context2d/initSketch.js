import p5 from "p5";
import { A_FORMAT_WIDTH, A_FORMAT_HEIGHT } from "@constants/P5_sketch_sizes";

export function initSketch () {
    return new p5((sketch) => {
        sketch.setup = () => {
            const canvas = sketch.createCanvas(A_FORMAT_WIDTH, A_FORMAT_HEIGHT);
            canvas.parent(this); // вставляем в DOM-элемент
            sketch.background(220); // Дефолтная серая тема
            sketch.noLoop(); // Отключаем цикл анимации
        };

        return sketch;
    });
}