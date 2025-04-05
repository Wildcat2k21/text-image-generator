import generateRandomText from "./modules/generateRandomText";
import { dictonaryRusLower } from "./constants/dictonaries";

const test = generateRandomText(dictonaryRusLower, 10);

const isString = typeof test === "string";
const isLengthIsTen = test.length === 10;

console.log(test, isString, isLengthIsTen, "То или не то: ", isString && isLengthIsTen);
console.log("hello world");