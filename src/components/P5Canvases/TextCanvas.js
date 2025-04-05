// Скетч для генерации листов

import { Component } from "../../utils/Component.js";
import p5 from "p5"; // убедись, что p5 установлен через npm

// 210 / 297 пропорции листов формата А

const SKETCH_WIDTH = 422;
const SKETCH_HEIGHT = 600;

export default function TextCanvas() {
    return Component({
        html: /*html*/ `
            <div class="p5-sketch"></div>
        `,
        setup: (el) => {
            // Инициализируем p5-инстанс, указывая контейнер как родительский элемент для canvas
            new p5((sketch) => {
                sketch.setup = () => {
                    const canvas = sketch.createCanvas(SKETCH_WIDTH, SKETCH_HEIGHT);
                    canvas.parent(el); // размещаем canvas внутри нашего контейнера
                    sketch.background(200);
                    
                    // Выводим приветственный текст
                    sketch.textSize(32);
                    sketch.textAlign(sketch.CENTER, sketch.CENTER);
                    sketch.fill(0);
                    sketch.text("Привет!", sketch.width / 2, sketch.height / 2);
                };
                
                sketch.draw = () => {
                    // Если нужна анимация, можно добавить логику сюда,
                    // а если нет — оставить пустым
                };
            }, el);
        }
    });
}
