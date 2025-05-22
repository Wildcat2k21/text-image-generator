export const filterCase3 = () => ({
    title: "filter3",
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
        from: 1.5,
        to: 1.5
    },
    noise: {
        from: 0,
        to: 0.025
    }
});