// Модуль вспомогательных функций для словарей
// Функция для получения случайного слова из словаря
// Функция для объединения произвольного кол-ва словарей

//функция для получения случайного символа из имеющихся у нас(используется в функции generateRandomText)
export function getRandomSign(dictonary){
    return Math.floor(Math.random() * dictonary.length);
}

//функция для объединения произвольного кол-ва словарей
export function uniteDictonaries(...dictionaries){
    const unitedDictonary = [];

    for(const dict of dictionaries){
        unitedDictonary.push(...dict);
    }
    return unitedDictonary.toString();
}