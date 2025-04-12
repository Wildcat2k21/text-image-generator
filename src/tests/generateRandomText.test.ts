import { describe, it, expect } from "vitest";
import generateRandomText from "../modules/generateRandomText.js";


describe("Модуль generateRandomText.js", () => {
    it("Должен генерировать текст указанной длины, с учётом симовлов переноса строки", () => {
        const length = 200;
        const alphabet = "qwertyuiop";
        const text = generateRandomText(alphabet, length);     
        expect(text.length).toBe(length);
    });
});

