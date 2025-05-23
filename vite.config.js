import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";

export default defineConfig({
    plugins: [eslintPlugin()],
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@helpers": path.resolve(__dirname, "src/helpers"),
            "@api": path.resolve(__dirname, "src/api"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@constants": path.resolve(__dirname, "src/constants"),
            "@tests": path.resolve(__dirname, "src/tests"),
        },
    },
    server: {
        port: 3000,
    },
    build: {
        outDir: "dist",
    },
    test: {
        environment: "jsdom",
        setupFiles: "./vitest.setup.js",
        globals: true,
    },
});
