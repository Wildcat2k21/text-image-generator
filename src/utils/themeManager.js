// Модуль для управления темой страницы

export const setTheme = (theme) => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
};

// Берем тему дефолтную тему браузера
const getPreferredTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Инициализируем тему из хранилища или дефолтную
export const themeInit = () => {
    const savedTheme = localStorage.getItem("theme") || getPreferredTheme();
    setTheme(savedTheme);
    return savedTheme === "dark";
};

export const toggleTheme = (enabled) => {
    setTheme(enabled ? "dark" : "light");
};
