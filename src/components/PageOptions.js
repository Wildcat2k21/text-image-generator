// Компоненты управления темой на странице предпросмотра

import { Component } from "../utils/Component.js";
import { toggleTheme, themeInit } from "../utils/ThemeManager.js";
 
export default function PageOptions() {
    return Component({
        html: /*html*/ `
            <div class="page-theme">
                <h3>Настройки страницы</h3>
                <label class="page-theme__label">
                    Темная тема
                    <input class="page-theme__checkbox" type="checkbox" id="dark-theme-checkbox">
                </label>
            </div>
        `,
        setup: (el) => {
            const checkbox = el.querySelector("#dark-theme-checkbox");
            checkbox.addEventListener("change", (e) => {
                toggleTheme(e.target.checked);
            });

            // Инициализируем тему из localStorage
            checkbox.checked = themeInit();;
        }
    });
}
