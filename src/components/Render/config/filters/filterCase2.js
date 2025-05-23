export const filterCase2 = () => ({
    title: "filter2",
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
        to: 3
    },
    noise: {
        from: 0,
        to: 0.025
    }
});