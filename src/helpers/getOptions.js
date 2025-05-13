export const getRenderOptions = (elem = document) => {
    // Значение window для управления через headless браузер
    const amount = window.renderAmount || elem.querySelector("#data-amount-input").value;
    const compress = elem.querySelector("#data-quality-input").value;

    return { amount: Number(amount), compress: Number(compress) };
};

export const getPreviewOptions = (elem = document) => {
    const orbit = elem.querySelector("#webgl-orbit-checkbox").checked;

    return { orbit };
};