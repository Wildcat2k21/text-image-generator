import { generateParams } from "../../../utils/params";
import { cases } from "../config/index";
import { randomArrayElement } from "../../../helpers/math";

export const FORMAT_LIST = {
    BLOB: "blob",
    DATA_URL: "url",
    TENSOR: "tensor"
};

export async function generateImages(
    listSource,
    sceneSource,
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

        const randomCase = randomArrayElement(cases.list);
        const randHandSubCase = randomArrayElement(randomCase.handwrite);
        const randSceneSubCase = randomArrayElement(randomCase.scene);

        const randomHandwriteCase = randHandSubCase();
        const randomSceneCase = randSceneSubCase();

        // Вызыварем рендер со случайными кейсом параметров листа
        listSource.renderText(randomHandwriteCase);
        const textMetrics = randomHandwriteCase.renderText;//Метод для получения метрик текста - listSource.getTextMetrics();

        // Вызыварем рендер со случайными кейсом параметров сцены
        const sceneParams = generateParams(randomSceneCase);
        const sceneCanvas = sceneSource.renderScene(sceneParams, previewMode);

        // Создаем blob сцены webGL
        if(format === FORMAT_LIST.BLOB){
            const imageBlob = await new Promise((resolve) => {
                sceneCanvas.toBlob((blob) => {
                    resolve(blob);
                }, "image/jpeg", jpegComp);
            });

            images.push({image: imageBlob, textMetrics});
        }

        // Создаем dataUrl сцены
        if(format === FORMAT_LIST.DATA_URL){
            images.push({
                image: sceneCanvas.toDataURL("image/jpeg", jpegComp),
                textMetrics
            });
        }
    }

    return images;
};