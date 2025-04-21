import { transformObjectValues } from "../../utils/params";

export const transformRelativeParams = (variationParams, transformFunction) => {
    return transformObjectValues(variationParams, {
        char_variation: {
            translate: {
                shiftX: true,
                shiftY: true
            }
        },
        line_variation: {
            transform: {
                start: true,
                end: true,
                top: true,
                bottom: true,
                height: true
            }
        },
        renderListConfig: {
            linesOptions: {
                size: true,
                strokeWeight: true
            },
            borderLine: {
                pad: true
            }
        },
        fontSize: true
    }, transformFunction);
};
