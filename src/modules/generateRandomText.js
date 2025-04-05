// Данный модуль предназначен для генерации случайного текста, в котором задаётся:
// длина для символов конечного текста
// словарь из которого состоит даннный текст
import { getRandomSign } from "../helpers/dictonaries.js";

//основная функция для генерации случайного текста(определённой длины length) из словаря - dictonary
export default function generateRandomText(dictonary, length){
    let text = "";
    const punctuationMarks = [".","?","!",",",":","-"];
    const lineBreak = "\n";

    for(let i = 0; i < length; ++i){
        const rand = Math.random();

        if(rand >= 0.2){
            let char = dictonary[getRandomSign(dictonary)];            
           
            const shouldToUpperCase = (i) =>{
                return (i === 0 || (text[i-1] === "." || text[i-1] === "?" || text[i-1] === "!"));
            };

            if(shouldToUpperCase(i)) {
                //в этой строчке добваляется перенос строки
                if(rand >= 0.6) text += lineBreak;
                char = char.charAt(0).toUpperCase();                
            }            
            text += char;
        }        
        else if(i > 0 && 0.2 > rand && rand >= 0.15){
            text += punctuationMarks[getRandomSign(punctuationMarks)];
        }
        else if(i > 0 && 0.15 > rand && rand >= 0){            
            text += " ";        
        }          
    }
    // console.log(text) 
    return text;
}
