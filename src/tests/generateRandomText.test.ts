import { describe, it, expect } from "vitest";
import generateRandomText from "../modules/generateRandomText.js";


describe("Длина текста в generateRandomText.js", () => {
    it("Должен генерировать текст указанной длины, с учётом симовлов переноса строки", () => {
        const length = 200;
        const alphabet = "qwertyuiop";
        const text = generateRandomText(alphabet, length);     
        expect(text.length).toBe(length);
    });
});


describe("Заглавные буквы после знаков пунктуации в generateRandomText", () => {
    it("Должен быть с заглавной буквы после знаков пунктуации(.?!) ", () => {
      const alphabet = "qwertyuiop";
      const length = 1000; 
      const text = generateRandomText(alphabet, length);
  
    // Проверяем до text.length - 2, так как смотрим на 2 символа вперед
    for (let i = 0; i < text.length - 2; i++) {
        const currentChar = text[i];
        const spaceChar = text[i + 1];
        const nextUpperChar = text[i + 2];

        // Проверяем, символ после пробела  - это НЕ перенос строки
        if(nextUpperChar != "\n"){
            // Проверяем, что следующий символ - это буква и она заглавная
            if (currentChar === '.' || currentChar === '!' || currentChar === '?') {                
                expect(spaceChar).toBe(" "); // Обязательный пробелq                
                expect(nextUpperChar).toMatch(/[A-Z]/); // Заглавная буква после пробела
              }
        }
        
      }
    });
  });