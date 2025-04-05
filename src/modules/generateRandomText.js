// Данный модуль предназначен для генерации случайного текста, в котором задаётся:
// длина для символов конечного текста
// словарь из которого состоит даннный текст
// и функция для объединения нескольких словарей в 1 общий

//основная функция для генерации случайного текста(определённой длины length) из словаря - dictonary
function generateRandomText(dictonary, length){
    const text = [];
    const punctuationMarks = [".","?","!",",",":","-"];
    
    for(let i = 0; i < length; ++i){
        const rand = Math.random();

        if(rand >= 0.2){
            let word = dictonary[getRandomSign(dictonary)];            
           
            if(i === 0 || (text[i-1] === "." || text[i-1] === "?" || text[i-1] === "!")) {
                word = word.charAt(0).toUpperCase();
            }            
            text.push(word);
        }
        else if(i > 0 && 0.2 > rand && rand >= 0.15){
            text.push(punctuationMarks[getRandomSign(punctuationMarks)]);
        }
        else if(i > 0 && 0.15 > rand && rand >= 0){            
            text.push(" ");        
        }          
    }
    // console.log(text) 
    return text;
}

//функция для получения случайного символа из имеющихся у нас(используется в функции generateRandomText)
function getRandomSign(dictonary){
    return Math.floor(Math.random() * dictonary.length);
}

//функция для объединения произвольного кол-ва словарей
function uniteDictonaries(...dictionaries){
    const unitedDictonary = [];

    for(const dict of dictionaries){
        unitedDictonary.push(...dict);
    }
    return unitedDictonary.toString();
}