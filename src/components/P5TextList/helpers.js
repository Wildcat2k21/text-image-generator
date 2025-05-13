import { transformObjectValues } from "@utils/params";

export const transformRelativeParams = (variationParams, transformFunction) => {
    return transformObjectValues(variationParams, {
        renderProps: {
            charVariation: {
                translate: {
                    shiftX: true,
                    shiftY: true
                }
            },
            lineVariation: {
                transform: {
                    start: true,
                    end: true,
                    top: true,
                    bottom: true,
                    height: true
                }
            }
        },
        listProps: {
            linesOptions: {
                size: true,
                strokeWeight: true
            },
            borderLine: {
                pad: true
            }
        },
        textProps: {
            fontSize: {
                from: true,
                to: true
            }
        }
    }, transformFunction);
};
