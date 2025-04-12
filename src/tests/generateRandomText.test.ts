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

describe("generateRandomText", () => {
    it("Должен быть с большой буквы после пунктуации(.?!) ", () => {
      const alphabet = "qwertyuiop";
      const length = 100; 
      const text = generateRandomText(alphabet, length);
  
      // Проверяем каждый символ в тексте
      for (let i = 0; i < text.length - 1; i++) {
        const currentChar = text[i];
        const nextChar = text[i + 1];
        
        if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
          // Проверяем, что следующий символ - это буква и она заглавная
          expect(nextChar).toBe(" "); // Обязательный пробел
          expect(nextChar).toMatch(/[A-Z]/); // Заглавная буква после пробела
        }
      }
    });
  });