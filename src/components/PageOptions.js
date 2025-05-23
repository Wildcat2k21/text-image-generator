// Компоненты управления темой на странице предпросмотра

import { Component } from "@utils/Component.js";
import { toggleTheme, themeInit } from "@utils/themeManager.js";
 
export default function PageOptions() {
    return Component({
        html: /*html*/ `
            <div class="page-options">
                <h3 class="header h3-header page-options__header">Настройки страницы</h3>
                <fieldset class="page-options__fieldset fieldset">
                    <!-- Тема страницы -->
                    <label class="page-options__label label">
                        Темная тема
                        <input class="page-options__theme-checkbox" type="checkbox" id="dark-theme-checkbox">
                    </label>
                </fieldset>
            </div>
        `,
        setup: function(){
            const themeCheckbox = this.querySelector("#dark-theme-checkbox");
            themeCheckbox.addEventListener("change", (e) => {
                toggleTheme(e.target.checked);
            });

            // Инициализируем тему из localStorage
            themeCheckbox.checked = themeInit();
        }
    });
}
