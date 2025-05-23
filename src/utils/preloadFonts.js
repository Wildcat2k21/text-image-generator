import p5 from "p5";

const fontPaths = {
    abram: "/fonts/Abram.ttf",
    anselmo: "/fonts/Anselmo.ttf",
    benvolio: "/fonts/Benvolio.ttf",
    capuletty: "/fonts/Capuletty.ttf",
    // djiovanni: "/fonts/Djiovanni.ttf", Не поддерживает латиницу
    eskal: "/fonts/Eskal.ttf",
    gregory: "/fonts/Gregory.ttf",
    lexa: "/fonts/Lexa.ttf",
    lorenco: "/fonts/Lorenco.ttf",
    merk: "/fonts/Merk.ttf",
    montekky: "/fonts/Montekky.ttf",
    pag: "/fonts/Pag.ttf",
    paris: "/fonts/Paris.ttf",
    salavat: "/fonts/Salavat.ttf",
    // samson: "/fonts/Samson.ttf", Не поддерживает латиницу
    shriftone: "/fonts/shriftone.ttf",
    // stefano: "/fonts/Stefano.ttf"
};

export const fontNames = Object.keys(fontPaths);

let fontManager = null;

export async function preloadFonts() {
    if (fontManager) return fontManager;

    return new Promise((resolve, reject) => {
        new p5((sketch) => {
            sketch.setup = () => {
                const fonts = {};
                let loadedCount = 0;

                fontNames.forEach((name) => {
                    sketch.loadFont(fontPaths[name], (font) => {
                        fonts[name] = font;
                        loadedCount++;

                        if (loadedCount === fontNames.length) {
                            fontManager = {
                                getCurrent: (name) => fonts[name] || null,
                                getAll: () => ({ ...fonts }),
                                getNames: () => [...fontNames]
                            };

                            resolve(fontManager);
                        }
                    }, (err) => {
                        reject(new Error(`Ошибка загрузки шрифта: ${fontPaths[name]}. Текст ошибки: ${err}`));
                    });
                });

                // Удаляем временный скетч
                sketch.remove();
            };
        });        
    });
}
