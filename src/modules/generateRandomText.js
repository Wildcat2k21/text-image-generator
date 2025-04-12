// Данный модуль предназначен для генерации случайного текста, в котором задаётся:
// длина для символов конечного текста
// словарь, из которого состоит данный текст
import { getRandomSign } from "../helpers/dictonaries.js";

export default function generateRandomText(dictionary, length) {
    let text = "";
    const punctuationMarks = [".", "?", "!", ",", ":", "-"];
    const lineBreak = "\n";
    let shouldToUpperCase = true;
    let spaceAllowed = true;
    let punctuationMarkAllowed = true;

    while (text.length < length) {
        const rand = Math.random();

        if (rand >= 0.2) {
            // Генерация символов
            let char = dictionary[getRandomSign(dictionary)];
            
            if (shouldToUpperCase) { 
                char = char.toUpperCase();
                shouldToUpperCase = false;
            }
            
            text += char;
            spaceAllowed = true;
            punctuationMarkAllowed = true;
        } else if (rand >= 0.05 && rand < 0.2) {
            // Генерация пробела
            if (spaceAllowed && text.length + 1 <= length) {
                text += " ";
                spaceAllowed = false;
            }
            punctuationMarkAllowed = true;
        } else if (rand < 0.05) {
            // Генерация знаков препинания, пробела после него и переноса строки

            // После знака препинания у нас генерируется ещё и пробел (т.е 2 символа),
            // здесь проверятеся что можно добавить ещё 2 символа в наш текст(без этой проверки текст превысит заданную длину) 
            if (punctuationMarkAllowed && text.length + 2 <= length) {
                let punctuationMark = punctuationMarks[getRandomSign(punctuationMarks)];
                text += punctuationMark;
                text += " ";
                punctuationMarkAllowed = false;

                if ([".", "?", "!"].includes(punctuationMark)) {
                    if (rand < 0.02 && text.length + 1 <= length) {
                        text += lineBreak;
                    }
                    shouldToUpperCase = true;
                }
                spaceAllowed = false;
            }
        }
    }
    return text;
}
