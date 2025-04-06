import p5 from "p5";

const fontPaths = {
    abram: "/fonts/Abram.ttf",
    anselmo: "/fonts/Anselmo.ttf",
    benvolio: "/fonts/Benvolio.ttf",
    capuletty: "/fonts/Capuletty.ttf",
    djiovanni: "/fonts/Djiovanni.ttf",
    eskal: "/fonts/Eskal.ttf",
    gregory: "/fonts/Gregory.ttf",
    lexa: "/fonts/Lexa.ttf",
    lorenco: "/fonts/Lorenco.ttf",
    merk: "/fonts/Merk.ttf",
    montekky: "/fonts/Montekky.ttf",
    pag: "/fonts/Pag.ttf",
    paris: "/fonts/Paris.ttf",
    salavat: "/fonts/Salavat.ttf",
    samson: "/fonts/Samson.ttf",
    shriftone: "/fonts/shriftone.ttf",
    stefano: "/fonts/Stefano.ttf"
};

let loadedFonts = null;

export async function preloadFonts() {
    if (loadedFonts) return loadedFonts;

    return new Promise((resolve, reject) => {
        const tmpSketch = (sketch) => {
            sketch.setup = () => {
                const fonts = {};
                const keys = Object.keys(fontPaths);

                keys.forEach((key, index) => {
                    sketch.loadFont(fontPaths[key], (font) => {
                        fonts[key] = font;
                        if (index === keys.length - 1) {
                            loadedFonts = fonts;
                            sketch.remove(); // Удаляем временный скетч
                            resolve(fonts);
                        }
                    }, (err) => {
                        console.error("Ошибка загрузки шрифта", fontPaths[key], err);
                        reject(err);
                    });
                });
            };
        };

        // Создаем временный скетч
        new p5(tmpSketch, document.createElement("div")); // не вставляем в DOM
    });
}
