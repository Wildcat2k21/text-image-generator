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
});
