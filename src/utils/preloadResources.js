import p5 from "p5";

const resourcePaths = {
    images: {
    // Окружение
        skybox: "/images/skybox1.jpg",
        table1: "/images/table-texture1.jpg",
        table2: "/images/table-texture2.jpg",
        table3: "/images/table-texture3.jpg",
        table4: "/images/table-texture4.jpg",

        // UV beak текстура тетради
        noteTexture: "/images/note-texture.png",

        // заглушки для листов
        leftListLines: "/images/left-list-l.png",
        rightListLines: "/images/right-list-l.png",
        leftListGrid: "/images/left-list-g.png",
        rightListGrid: "/images/right-list-g.png"
    },
    // Модели тетради и листов (1 - 3 изгиб листа)
    models: {
        note: { obj: "/models/note/note.obj", mtl: "/models/note/note.mtl" },
        left_list1: { obj: "/models/lists/left-list1.obj", mtl: "/models/lists/left-list1.mtl" },
        left_list2: { obj: "/models/lists/left-list2.obj", mtl: "/models/lists/left-list2.mtl" },
        left_list3: { obj: "/models/lists/left-list3.obj", mtl: "/models/lists/left-list3.mtl" },
        right_list1: { obj: "/models/lists/right-list1.obj", mtl: "/models/lists/right-list1.mtl" },
        right_list2: { obj: "/models/lists/right-list2.obj", mtl: "/models/lists/right-list2.mtl" },
        right_list3: { obj: "/models/lists/right-list3.obj", mtl: "/models/lists/right-list3.mtl" }
    }
};

// Генерация enum-подобных констант для удобного доступа
export const Images = Object.freeze(
    Object.fromEntries(
        Object.keys(resourcePaths.images).map(key => [key.toUpperCase(), key])
    )
);
export const Models = Object.freeze(
    Object.fromEntries(
        Object.keys(resourcePaths.models).map(key => [key.toUpperCase(), key]))
);

// Также экспортируем массивы имён ресурсов
export const imageResourceNames = Object.keys(resourcePaths.images);
export const modelResourceNames = Object.keys(resourcePaths.models);

let resourceManager = null;

export function preloadResources() {
    if (resourceManager) return Promise.resolve(resourceManager);

    return new Promise((resolve, reject) => {
        const tempSketch = new p5(() => {});

        const imageEntries = Object.entries(resourcePaths.images);
        const modelEntries = Object.entries(resourcePaths.models);

        const images = new Map();
        const models = new Map();

        let totalToLoad = imageEntries.length + modelEntries.length;
        let loadedCount = 0;

        function checkDone() {
            loadedCount++;
            if (loadedCount === totalToLoad) {
                tempSketch.remove();
                resourceManager = {
                    images: {
                        getCurrent: name => images.get(name) || null,
                        getAll: () => new Map(images),
                        getNames: () => Array.from(images.keys())
                    },
                    models: {
                        getCurrent: name => models.get(name) || null,
                        getAll: () => new Map(models),
                        getNames: () => Array.from(models.keys())
                    }
                };
                resolve(resourceManager);
            }
        }

        // Загрузка изображений
        for (const [key, path] of imageEntries) {
            tempSketch.loadImage(
                path,
                img => {
                    images.set(key, img);
                    checkDone();
                },
                // eslint-disable-next-line no-unused-vars
                err => reject(new Error(`Ошибка загрузки изображения: ${path}`))
            );
        }

        // Загрузка моделей
        for (const [key, paths] of modelEntries) {
            tempSketch.loadModel(
                paths.obj,
                true,
                model => {
                    models.set(key, model);
                    checkDone();
                },
                // eslint-disable-next-line no-unused-vars
                err => reject(new Error(`Ошибка загрузки OBJ модели: ${paths.obj}`))
            );
        }
    });
}
