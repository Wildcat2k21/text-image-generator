const DEFAULT_BLUR_AMOUNT = 0.5;

// Карта для удобства доступа
export const SecondListTextures = {
    LEFT_LIST_LINES:  "leftListLines",
    RIGHT_LIST_LINES: "rightListLines",
    LEFT_LIST_GRID:   "leftListGrid",
    RIGHT_LIST_GRID:  "rightListGrid",
};

// Карта для удобства доступа
const blurImageCache = {};

// Возвращает размытое изображение по ключу из SheetTexture
export function getBlurredList(sketch, images, listName, blurAmount = DEFAULT_BLUR_AMOUNT) {
    if(blurImageCache[listName]) {
        return blurImageCache[listName];
    }

    const listImage = images.getCurrent(listName);
    
    if (!listImage) {
        // eslint-disable-next-line
        console.warn(`Картинка "${listName}" не найдена`);
        return null;
    }

    if(blurAmount === 0){
        blurImageCache[listName] = listImage;
        return listImage;
    }

    const bluredImage = sketch.createGraphics(listImage.width, listImage.height, sketch.P2D);
    bluredImage.image(listImage, 0, 0);
    bluredImage.filter(sketch.BLUR, blurAmount);
    blurImageCache[listName] = bluredImage;
    return bluredImage;
}