import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
    plugins: [eslintPlugin()],
    server: {
        port: 3000, // Настраиваем порт сервера
    },
    build: {
        outDir: "dist", // Куда собирать файлы
    },
    test: {
        // Указываем среду выполнения тестов
        environment: "jsdom",
        setupFiles: "./vitest.setup.js",
        // Дополнительные настройки, например, globals
        globals: true,
    }
});
