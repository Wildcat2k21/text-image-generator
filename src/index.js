import generateRandomText from "./modules/generateRandomText";
import { dictonaryLatLower } from "./constants/dictonaries";

const test = generateRandomText(dictonaryLatLower, 10);


const isString = typeof test === "string";
const isLengthIsTen = test.length === 10;

console.log(test, isString, isLengthIsTen, "То или не то: ", isString && isLengthIsTen);
console.log("hello world");