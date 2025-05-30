// Типы листов
export const SheetType = {
    GRID: "grid",
    LINES: "lines",
    BACKGROUND_ONLY: "backgroundOnly",
};

// Настройки линии по умолчанию
const defaultLinesOptions = {
    color: "#000000",
    strokeWeight: 1,
    size: 20,
};
  
// Рендерит различные типы листов
export function renderList({sheetType = SheetType.GRID, background = "#fff", linesOptions = defaultLinesOptions, borderLine}){
    if (!Object.values(SheetType).includes(sheetType)) {
        throw new Error("Тип листа не поддерживается. Поддерживаемые типы: grid, lines, backgroundOnly");
    }

    // Получаем инстанс p5
    const p5 = this;
    const { width, height } = p5;

    // Сохраняем настройки
    p5.push();

    // Устанавливаем фон
    p5.background(background);

    // Устанавливаем ширину линии
    p5.strokeWeight(linesOptions.strokeWeight);

    // Рендерим лист в клетку
    if(sheetType !== SheetType.BACKGROUND_ONLY){
        // Устанавливаем ширину линии и цвет
        p5.stroke(linesOptions.color);

        // Рисуем горизонтальные линии
        for(let cellY = 0; cellY < height; cellY += linesOptions.size){
            p5.line(0, cellY, width, cellY);
        }

        // Рисуем вертикальные линии
        if(sheetType === SheetType.GRID){
            for(let cellX = 0; cellX < width; cellX += linesOptions.size){
                p5.line(cellX, 0, cellX, height);
            }
        }
    }

    // Линия слева
    if(borderLine && borderLine.onLeft){
        // Устанавливаем ширину линии и цвет
        p5.stroke(borderLine.color);
        p5.line(borderLine.pad, 0, borderLine.pad, height);
    }
    
    // Линия справа
    if(borderLine && !borderLine.onLeft){
        p5.stroke(borderLine.color);
        p5.line(width - borderLine.pad, 0, width - borderLine.pad, height);
    }

    // Восстанавливаем предыдущие настройки
    p5.pop();
}