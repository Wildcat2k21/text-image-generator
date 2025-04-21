import p5 from "p5";

const resourcePaths = {
    skybox: "/images/skybox1.jpg",
    texture1: "/images/texture1.jpg",
    texture2: "/images/texture2.jpg",
    texture3: "/images/texture3.jpg"
};

let resourceManager = null;

export function preloadResources() {
    if (resourceManager) return Promise.resolve(resourceManager);

    return new Promise((resolve, reject) => {
        const tempSketch = new p5(() => {});
        const entries = Object.entries(resourcePaths);
        const resources = new Map();
        let loaded = 0;

        entries.forEach(([key, path]) => {
            tempSketch.loadImage(path, (img) => {
                resources.set(key, img);
                loaded++;
                if (loaded === entries.length) {
                    // Создаем менеджер ресурсов
                    resourceManager = {
                        getCurrent: (name) => resources.get(name) || null,
                        getAll: () => new Map(resources), // вернуть копию Map
                        getNames: () => Array.from(resources.keys())
                    };
                    resolve(resourceManager);
                }
            }, (err) => reject(new Error(`Ошибка загрузки ресурса: ${path}. Текст ошибки: ${err}`)));
        });
    });
}
