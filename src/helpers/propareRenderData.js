const DEFAULT_ROUND_SIGN = 3;

export const roundRenderLinesOptions = (linesArray, signs = DEFAULT_ROUND_SIGN) => {
    return linesArray.map(line => ({
        rotated: parseFloat(line.rotated.toFixed(signs)),
        height: parseFloat(line.height.toFixed(signs)),
        width: parseFloat(line.width.toFixed(signs))
    }));
};

export const roundRenderCharsOptions = (charsArray, signs = DEFAULT_ROUND_SIGN) => {
    return charsArray.map(char => ({
        char: char.char,
        transform: char.transform.map(value => parseFloat(value.toFixed(signs))),
        rotated: parseFloat(char.rotated.toFixed(signs)),
        shifted_baseline_offset_x: parseFloat(char.shifted_baseline_offset_x.toFixed(signs)),
        shifted_baseline_offset_y: parseFloat(char.shifted_baseline_offset_y.toFixed(signs))
    }));
};

export const roundAndScaleMetrics = (metricsData, sign = DEFAULT_ROUND_SIGN) => {
    // Функция масштабирования и нормализации для каждой метрики
    const scale = (value, name) => {
        switch (name) {
        case "char-width":
            return (0.12 * value);

        case "char-height":
            return (0.12 * value);

        case "char-offset-x":
            return value * 1;
            
        case "char-offset-y":
            return value * 1;

        case "line-width":
            return value * 0.0125;

        case "line-height":
            return value * 0.05;

        case "line-rotated":
            return value * 20;

        case "line-rotated-power":
            return value;

        default:
            return value;
        }
    };

    // Округление значений
    const round = (value) => {
        return parseFloat(value.toFixed(sign));
    };

    return {
        averageCharMetrics: metricsData.averageCharMetrics.map((value, index) => {
            const metricName = [
                "char-width", 
                "char-height", 
                "char-offset-x", 
                "char-offset-y"
            ][index]; // Массив имен метрик для символов

            return round(scale(value, metricName));
        }),
        averageLineMetrics: metricsData.averageLineMetrics.map((value, index) => {
            const metricName = [
                "line-width", 
                "line-height", 
                "line-rotated", 
                "line-rotated-power"
            ][index]; // Массив имен метрик для строк

            return round(scale(value, metricName));
        }),
    };
};


  