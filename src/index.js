import "./index.css";
import Options from "./components/Options.js";
import TextCanvas from "./components/P5Canvases/TextCanvas.js";

const app = document.querySelector(".app");

const main = document.createElement("main");
main.classList.add("app__content");

main.innerHTML = /*html*/ `
    <h1 class="app__title">Генератор текстовых изображений</h1>
    <div class="app__options"></div>
    <div class="sketch-container"></div>
`;

main.querySelector(".app__options").appendChild(Options());
main.querySelector(".sketch-container").appendChild(TextCanvas());
app.appendChild(main);
