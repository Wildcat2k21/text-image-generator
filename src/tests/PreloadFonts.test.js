// Тестирование модуля загрузки шрифтов для p5

import { describe, it, expect } from "vitest";
import { preloadFonts } from "../helpers/preloadFonts";

describe("PreloadFonts", () => {
    it("должен успешно загрузить все шрифты", async () => {
        const fonts = await preloadFonts();

        // Проверяем, что возвращен объект
        expect(fonts).toBeTypeOf("object");

        // Проверяем наличие всех ключей из fontPaths
        const expectedKeys = [
            "abram", "anselmo", "benvolio", "capuletty", "djiovanni", "eskal",
            "gregory", "lexa", "lorenco", "merk", "montekky", "pag", "paris",
            "salavat", "samson", "shriftone", "stefano"
        ];

        for (const key of expectedKeys) {
            expect(fonts).toHaveProperty(key);
            expect(fonts[key]).toBeDefined();
        }
    });

    it("должен использовать кэш при повторном вызове", async () => {
        const fonts1 = await preloadFonts();
        const fonts2 = await preloadFonts();

        // Проверяем, что возвращен один и тот же объект
        expect(fonts1).toBe(fonts2);
    });
});
