import "@src/index.css";
import PageOptions from "@components/PageOptions.js";
import PreviewOptions from "@components/PreviewOptions.js";
import RenderOptions from "@components/render";
import Manuscript from "@components/P5_context2d";
import Scene from "@components/P5_webGL";
import FiltersPreview from "@components/FiltersPreview";

const app = document.querySelector(".app");
const main = document.createElement("main");
main.classList.add("app__content");

main.innerHTML = /*html*/ `
    <h1 class="app__title header h1-header">Генератор текстовых изображений</h1>
    <h2 class="app__subtitle header h4-header">By wildcat2k21 🐈‍⬛</h2>
    <div class="app__options"></div>
    <div class="p5-sketch-container">
        <!-- скетчи вставляются здесь -->
    </div>
`;

// Добавляем скетчи
main.querySelector(".p5-sketch-container").appendChild(Manuscript());
main.querySelector(".p5-sketch-container").appendChild(Scene());
main.querySelector(".p5-sketch-container").appendChild(FiltersPreview());
app.appendChild(main);

main.querySelector(".app__options").appendChild(PageOptions());
main.querySelector(".app__options").appendChild(PreviewOptions());
main.querySelector(".app__options").appendChild(RenderOptions()); //Взаимодействие с рендером
