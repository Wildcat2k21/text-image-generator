import { renderConfig } from "../config/index";
import { randomArrayElement } from "@helpers/math";
import { 
    getFilterParams,
    getSceneParams,
    getHandCaseParamsRaw
} from "./other";

export const FORMAT_LIST = {
    BLOB: "blob",
    DATA_URL: "url",
    TENSOR: "tensor"
};

export async function generateImages(
    listSource,
    sceneSource,
    { filterController },
    previewMode,
    amount,
    format,
    jpegComp
){
    if(!Object.values(FORMAT_LIST).includes(format)){
        throw new Error(`Формат не распознан: ${format}`);
    }

    if(!Number.isInteger(amount) || amount < 1 || amount > 100){
        throw new Error("Количество генерируемых изображений за раз должно быть целым числом от 1 до 100");
    }

    const images = [];

    for(let i = 0; i < amount; i++){
        const randomGroup = randomArrayElement(renderConfig.groups)();
        const randomHandwriteCase = getHandCaseParamsRaw(randomGroup.handwrite);
        const sceneParams = getSceneParams(randomGroup.scene);
        const filterParams = getFilterParams(randomGroup.filters);

        // Вызыварем рендер со случайными кейсом параметров листа
        listSource.renderText(randomHandwriteCase);
        const textMetrics = listSource.getTextMetrics();
        //listSource.getTextMetrics();//Метод для получения метрик текста - listSource.getTextMetrics();

        // Также возвращает ссылку на Canvas сцены
        sceneSource.renderScene(sceneParams, previewMode);

        // Превью фильтров с автообновлением
        previewMode ? filterController.startLoop(undefined, filterParams)
            : filterController.update(filterParams);

        const outputCanvas = filterController.canvas;

        // console.log(0.85); //выводит 10
        // Создаем blob сцены webGL
        if(format === FORMAT_LIST.BLOB){
            const imageBlob = await new Promise((resolve) => {
                outputCanvas.toBlob((blob) => {
                    resolve(blob);
                }, "image/jpeg", 0.85);
            });

            images.push({image: imageBlob, textMetrics});
        }

        // Создаем dataUrl сцены
        if(format === FORMAT_LIST.DATA_URL){
            images.push({
                image: outputCanvas.toDataURL("image/jpeg", jpegComp),
                textMetrics
            });
        }
    }

    return images;
};