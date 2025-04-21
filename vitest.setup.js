// Сценарии перед выполнением тестов vite
// Ставим заглушки для Canvas API т.к jsDom не имеет их полную реализацию
// Необхадимо для тестирования вспомогательных модулей библиотеки p5

// Переопределяем getContext для всех канвасов
HTMLCanvasElement.prototype.getContext = function(type) {
    if (type === "2d") {
        return {
            scale: () => {},
            fillRect: () => {},
            clearRect: () => {},
            drawImage: () => {},
            getImageData: () => ({ data: [] }),
            putImageData: () => {},
        // Можно добавить другие методы, если потребуется
        };
    }
    return null;
};
  