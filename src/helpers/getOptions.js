export const getRenderOptions = (elem = document) => {
    const amount = elem.querySelector("#data-amount-input").value;
    const compress = elem.querySelector("#data-quality-input").value;

    return { amount: Number(amount), compress: Number(compress) };
};

export const getPreviewOptions = (elem = document) => {
    const orbit = elem.querySelector("#webgl-orbit-checkbox").checked;

    return { orbit };
};