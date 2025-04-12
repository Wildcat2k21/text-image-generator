<<<<<<< HEAD
// import {  expect } from "vitest";
import generateRandomText from "./modules/generateRandomText.js";





console.log("hello world");
console.log(generateRandomText("qwertyuiop", 25));


=======
import generateRandomText from "./modules/generateRandomText";
import { dictonaryLatLower } from "./constants/dictonaries";

const test = generateRandomText(dictonaryLatLower, 10);


const isString = typeof test === "string";
const isLengthIsTen = test.length === 10;

console.log(test, isString, isLengthIsTen, "То или не то: ", isString && isLengthIsTen);
console.log("hello world");
>>>>>>> 2e5e4949b2220d580a9a35e74c4a3c6b4e2a83f9
