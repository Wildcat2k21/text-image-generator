export const filterCase1 = () => ({
    title: "filter1",
    // zoomBlur: 0.0125,
    unsharpMask: {
        arg1: 1.5,
        arg2: 1.5
    },
    vignette: {
        arg1: 0.1,
        arg2: 0.3
    },
    triangleBlur: {
        from: 0,
        to: 0.5
    },
    noise: {
        from: 0,
        to: 0.025
    }
});