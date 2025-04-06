import "./index.css";
import Options from "./components/Options.js";
import Manuscript from "./components/P5_sketches/Manuscript.js";

const app = document.querySelector(".app");
const main = document.createElement("main");
main.classList.add("app__content");

main.innerHTML = /*html*/ `
    <h1 class="app__title">Генератор текстовых изображений</h1>
    <div class="app__options"></div>
    <div class="p5-sketch-container">
        <!-- скетчи вставляются здесь -->
    </div>
`;

main.querySelector(".app__options").appendChild(Options());
main.querySelector(".p5-sketch-container").appendChild(Manuscript());
app.appendChild(main);
