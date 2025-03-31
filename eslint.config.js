import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: { js },
        extends: ["js/recommended"],
        rules: {
            // Отступы в 4 пробела
            indent: ["error", 4],
            // Обязательное использование точек с запятой
            semi: ["error", "always"],
            // Использование двойных кавычек для строк
            quotes: ["error", "double"],
            // Предупреждение об неиспользуемых переменных
            "no-unused-vars": "warn",
            // Предупреждение о вызовах console
            "no-console": "warn"
        },
    },
]);
