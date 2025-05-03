import { SheetType } from "../P5_context2d/renderList";

// Рисуем сцену webGL
export function P5renderScene(){
    const sketch = this;
    const {
        resourceManager,
        textureCanvas,
        sourceCanvas,
        note,
        table,
        camera,
        lightning,
        orbitControl
    } = sketch.renderData;

    const { images, models } = resourceManager;

    // Стол и skybox
    const tableTexture = images.getCurrent(table.texture);
    const skyboxTexture = images.getCurrent("skybox");

    // Заглушки для листов
    const leftListLines = images.getCurrent("leftListLines");
    const rightListLines = images.getCurrent("rightListLines");
    const leftListGrid = images.getCurrent("leftListGrid");
    const rightListGrid = images.getCurrent("rightListGrid");

    // Тетрадь
    const noteModel = models.getCurrent("note");
    const noteTexture = images.getCurrent("noteTexture");
    const leftList1 = models.getCurrent("left_list1");
    const rightList1 = models.getCurrent("right_list3");

    // Копируем содержимое из внешнего канваса
    textureCanvas.drawingContext.drawImage(sourceCanvas, 0, 0, textureCanvas.width, textureCanvas.height);

    // Исправляем маштаб при маленьком размере скетча
    // sketch.scale(4);
    
    // Контрол камеры
    if(orbitControl){
        sketch.orbitControl();
    }

    // Поворот камеры
    sketch.rotateX(camera.rotate[0]);
    sketch.rotateY(camera.rotate[1]);
    sketch.rotateZ(camera.rotate[2]);

    // Свет
    sketch.pointLight(...lightning.pointerLightRGB, 0, 0, 150);
    sketch.ambientLight(lightning.ambient);

    // === Стол ===
    sketch.push();
    sketch.translate(0, 0, 0);
    sketch.texture(tableTexture);
    sketch.specularMaterial(250);
    sketch.shininess(50);
    sketch.plane(400, 400);
    sketch.pop();

    const [
        trNoteX,
        trNoteY
    ] = note.translateXY;

    // === Тетрадь ===
    sketch.push();
    sketch.rotate(note.rotateXY);
    sketch.translate(trNoteX, trNoteY, 4);
    // sketch.scale(note.scale);
    sketch.specularMaterial(100);
    sketch.shininess(50);
    sketch.texture(noteTexture);
    sketch.model(noteModel);
    sketch.pop();

    // Выбираем отображение левого листа
    const displayLeftList = !   note.renderTextOnList 
        ? textureCanvas : (note.listTypes === SheetType.LINES ? leftListLines: leftListGrid);

    // Выбираем отображение правого листа
    const displayRightList = note.renderTextOnList 
        ? textureCanvas : (note.listTypes === SheetType.LINES ? rightListLines: rightListGrid);

    const leftListModel = resourceManager.models.getCurrent(note.lists.leftModelName);
    const rightListModel = resourceManager.models.getCurrent(note.lists.rightModelName);

    // === Лист (Левый) ===
    sketch.push();                                     
    sketch.rotate(note.rotateXY);                                                                                                                                                                                             
    sketch.translate(-46.5 + trNoteX, 0 + trNoteY, 10);
    sketch.scale(0.6);
    sketch.specularMaterial(10);
    sketch.shininess(1);
    sketch.texture(displayLeftList);
    sketch.model(leftListModel);
    sketch.pop();

    // === Лист (Правый) ===
    sketch.push();                                    
    sketch.rotate(note.rotateXY);                                                                                                                                                                                              
    sketch.translate(46.5 + trNoteX, 0 + trNoteY, 10);
    sketch.scale(0.6);
    sketch.specularMaterial(10);
    sketch.shininess(1);
    sketch.texture(displayRightList);
    sketch.model(rightListModel);
    sketch.pop();

    // === Skybox ===
    sketch.push();

    // Отодвигаем подальше, чтобы не мешал камере
    sketch.translate(0, 0, 0);
    sketch.texture(skyboxTexture);

    // Инвертируем нормали вручную — рисуем "внутреннюю" сторону
    sketch.scale(-1, 1, 1); // переворот по X, чтобы камера была внутри

    // отключаем освещение для skybox, чтобы выглядел как фон
    sketch.noLights();
    sketch.sphere(2000, 60, 40);
    sketch.pop();
};