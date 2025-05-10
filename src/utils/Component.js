// Компонент для создания DOM элемента

/**
 * Функция для создания DOM элемента на основе HTML
 *
 * @param {Object} options
 * @param {string} options.html - Строка HTML для создания компонента
 * @param {function} [options.setup] - Функция с инициализацией событий и связанной логикой
 * @returns {Element} Созданный DOM элемент
 */
export function Component({ html, setup }) {
    // Создаем DOM-элемент
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();
    const el = wrapper.firstElementChild;

    if (typeof setup === "function") {
        setup.call(el);
    }

    return el;
}
