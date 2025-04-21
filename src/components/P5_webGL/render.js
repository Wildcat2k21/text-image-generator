import { 
    A_FORMAT_HEIGHT,
    A_FORMAT_WIDTH
} from "../../constants/P5_sketch_sizes";

// Рисуем сцену webGL
export function P5renderScene(){
    const sketch = this;
    const {img, sourceCanvas, textureCanvas, skyboxImg, list, camera, lightning} = sketch.renderData;
    
    // Копируем содержимое из внешнего канваса
    if (sourceCanvas) {
        textureCanvas.drawingContext.drawImage(sourceCanvas, 0, 0, textureCanvas.width, textureCanvas.height);
    }

    // Исправляем маштаб при маленьком размере скетча
    sketch.scale(4);
    
    // Поворот камеры
    sketch.rotateX(camera.rotate[0]);
    sketch.rotateY(camera.rotate[1]);
    sketch.rotateZ(camera.rotate[2]);

    // Свет
    sketch.pointLight(...lightning.pointerLightRGB, 0, 0, 150);
    sketch.ambientLight(lightning.ambient);

    // Камера
    sketch.orbitControl();

    // === Стол ===
    sketch.push();
    sketch.translate(0, 0, 0);
    sketch.texture(img);
    sketch.specularMaterial(250);
    sketch.shininess(50);
    sketch.plane(200, 200);
    sketch.pop();

    // === Лист формата А с текстурой ===
    if (textureCanvas) {
        sketch.push();
        // Поворот листа
        sketch.rotate(list.rotateXY);
        // Смещение листа
        sketch.translate(...list.translateXY, 1);
        sketch.texture(textureCanvas);
        sketch.specularMaterial(50);
        sketch.shininess(20);
        sketch.plane(A_FORMAT_WIDTH / 5, A_FORMAT_HEIGHT / 5);
        sketch.pop();
    }

    // === Skybox ===
    sketch.push();

    // Отодвигаем подальше, чтобы не мешал камере
    sketch.translate(0, 0, 0);
    sketch.texture(skyboxImg);

    // Инвертируем нормали вручную — рисуем "внутреннюю" сторону
    sketch.scale(-1, 1, 1); // переворот по X, чтобы камера была внутри

    // отключаем освещение для skybox, чтобы выглядел как фон
    sketch.noLights();
    sketch.sphere(2000, 60, 40);
    sketch.pop();
};