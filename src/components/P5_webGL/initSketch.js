import p5 from "p5";
import { 
    PHONE_CAMERA_WIDTH,
    PHONE_CAMERA_HEIGHT,
} from "../../constants/P5_sketch_sizes";

export function initSketch (renderOptions, renderFunction, orbitControl) {
    return new p5((sketch) => {
        let sourceCanvas;
        let textureCanvas;
        let cam;

        const {
            camera,
            list,
            table,
            lightning,
            listRenderBufferSize,
        } = renderOptions;

        // Используем подгруженные ресурсы
        let img = this._p5Resources.getCurrent(table.texture);
        let skyboxImg = this._p5Resources.getCurrent("skybox");

        sketch.setup = () => {
            // Тут задается размер нашей условной камеры
            const canvas = sketch.createCanvas(PHONE_CAMERA_WIDTH, PHONE_CAMERA_HEIGHT, sketch.WEBGL);
            canvas.parent(this); // вставляем в DOM-элемент
            
            // Параметры перспективы и отрисовки
            // Для избавления эффектра отрогонольной проекции
            // При маленьких размерах скетчей
            let fov = Math.PI / 3; // Угол обзора
            let aspect = sketch.width / sketch.height;
            let near = 0.1; // Минимальное расстояние
            let far = 12000; // Максимальное расстояние
            sketch.perspective(fov, aspect, near, far);

            cam = sketch.createCamera(); // создаёт и возвращает текущую камеру
            sketch.noStroke();
            sketch.background(0);

            // Отключаем цикл анимации при orbit контроле
            if(!orbitControl){
                sketch.noLoop();
            }
        
            // Создаём буфер, в который будем копировать содержимое внешнего канваса
            textureCanvas = sketch.createGraphics(listRenderBufferSize, listRenderBufferSize); // Размер буфера, который определяет качество рендера листа
            textureCanvas.pixelDensity(1); // важно для стабильности в WebGL
    
            // Получаем внешний canvas
            sourceCanvas = document.querySelector(".p5-context-2d > canvas");

            // Устанавливаем камеру
            cam.setPosition(...camera.position);
            cam.lookAt(...camera.lookAt);

            // Сохраняем данные для рендера
            sketch.renderData = {img, sourceCanvas, textureCanvas, skyboxImg, list, camera, lightning, orbitControl};
        };

        sketch.draw = renderFunction.bind(sketch);
    });
};