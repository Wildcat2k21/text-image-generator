# Руководство по ESLint v9 для браузерной разработки (нативный JS и Vite)

Это руководство описывает настройку ESLint v9 для нативной разработки под браузер с использованием современного JavaScript и сборщика Vite. Данный подход помогает поддерживать единый стиль кода, обнаруживать ошибки на ранней стадии и интегрировать проверку кода непосредственно в процесс разработки.

---

## Установка ESLint v9

Для установки последней мажорной версии ESLint (v9) выполните команду:
```sh
npm install --save-dev eslint@9
```

---

## Инициализация конфигурации ESLint

После установки ESLint можно инициировать конфигурацию:
```sh
npx eslint --init
```
Процесс инициализации предложит выбрать тип проекта, стиль кодирования и дополнительные настройки. Выберите опции, соответствующие нативной разработке для браузера (например, использование ECMAScript modules и поддержку современных стандартов).

---

## Пример конфигурации для браузерной разработки

Ниже приведён пример файла конфигурации `eslint.config.js` для ESLint v9, адаптированного для нативного JavaScript в браузере. Конфигурация также учитывает рекомендации для использования в проектах на Vite.

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  {
    // Файлы с нативным JavaScript для браузера
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest", // Используйте современный синтаксис ECMAScript
      sourceType: "module",  // Использование ECMAScript modules
      globals: globals.browser, // Глобальные переменные браузера (window, document, и т.д.)
    },
    plugins: { js },
    // Расширяем базовые рекомендации ESLint и интегрируем Prettier для форматирования
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    rules: {
      // Отступы в 4 пробела
      indent: ["error", 4],
      // Использование двойных кавычек для строк
      quotes: ["error", "double"],
      // Обязательное использование точек с запятой
      semi: ["error", "always"],
      // Предупреждение о неиспользуемых переменных
      "no-unused-vars": "warn",
      // Предупреждение о вызовах console (можно настроить для продакшн)
      "no-console": "warn"
    },
  },
]);
```

---

## Интеграция ESLint с Vite

Для удобства разработки в Vite рекомендуется использовать плагин, который автоматически проверяет код на соответствие правилам ESLint при запуске dev-сервера.

### Установка плагина Vite для ESLint
```sh
npm install --save-dev vite-plugin-eslint
```

### Настройка Vite

Добавьте плагин в файл конфигурации `vite.config.js`:
```js
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [eslintPlugin()],
});
```

Это обеспечит автоматическую проверку кода на этапе разработки, позволяя своевременно обнаруживать и исправлять ошибки.

---

## Использование готовых наборов правил

Помимо приведённой конфигурации, вы можете интегрировать готовые наборы правил для повышения качества кода:
- **Airbnb**: Популярный набор правил для строгого соблюдения стиля кода.
  ```sh
  npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-prettier
  ```
- **Standard**: Лёгкий и популярный набор правил для большинства проектов.
  ```sh
  npm install --save-dev eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-config-prettier
  ```
- **Prettier**: Используется для автоматического форматирования кода и устранения конфликтов со стилевыми правилами ESLint.
  ```sh
  npm install --save-dev eslint-config-prettier
  ```

Вы можете комбинировать эти наборы, переопределяя правила в вашем конфигурационном файле по необходимости.

---

## Ресурсы и ссылки

- [Документация ESLint](https://eslint.org/docs/latest/)
- [ESLint v9: What's New](https://eslint.org/blog/2022/06/eslint-v9-released) *(при наличии официального анонса)*
- [Vite Plugin ESLint](https://github.com/gxmari007/vite-plugin-eslint)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Prettier](https://prettier.io/)

---

Настроив ESLint v9 для нативной браузерной разработки и интегрировав его с Vite, вы значительно улучшите качество кода и упростите процесс разработки. Удачной работы!  