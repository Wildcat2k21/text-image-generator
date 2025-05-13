import { filterCase1 } from "@components/Render/config/filters/filterCase1";
import { SCENE_PARENT_ID } from "@constants/sketchSelectors";

export function updateFilters(filters = filterCase1()){ // Стандартный фильтр по умолчанию
    const p5Wrapper = document.querySelector(`#${SCENE_PARENT_ID}`);
    if (!p5Wrapper || !p5Wrapper._p5Instance) return;

    // Получаем ресурсы для работы с фильтрами
    const {
        canvas,
        ctx2d,
        fxCanvas
    } = this;

    // Извлекаем установки фильтров
    const {
        // zoomBlur,
        unsharpMask,
        vignette,
        triangleBlur,
        noise
    } = filters;

    const preview = p5Wrapper._p5Instance.canvas;
    const texture = fxCanvas.texture(preview);

    fxCanvas.draw(texture)
        // .zoomBlur(canvas.width / 2, canvas.height / 2, zoomBlur)
        .unsharpMask(unsharpMask.arg1, unsharpMask.arg2)
        .vignette(vignette.arg1, vignette.arg2)
        .triangleBlur(triangleBlur)
        .noise(noise) // завершающий штрих — «антибандинг»
        .update();

    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    ctx2d.drawImage(fxCanvas, 0, 0);
};