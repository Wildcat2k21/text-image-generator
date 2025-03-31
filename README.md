# Генератор текстовых изображений

Генератор текстовых изображений — это клиентское приложение, предназначенное для создания изображений рукописного текста под различными углами. Приложение позволяет имитировать фотографии, созданные "подчерком" человека, и генерировать изображения с детальной информацией о тексте, включая наклон, разброс, расстояние между строками и другие параметры.

## Описание

Проект предоставляет удобный интерфейс для создания уникальных текстовых изображений с динамическими параметрами. Помимо визуальной генерации, система предоставляет подробную информацию о параметрах текста, что позволяет:
- Генерировать изображения с реалистичным рукописным стилем.
- Контролировать угол наклона, разброс и интервал между строками.
- Получать метаданные изображения, содержащие параметры текста и его расположения.

Для визуализации статистики процесса обучения проект интегрирован с серверной частью, обеспечивающей сбор и отображение данных о тренировке нейросети.

## Особенности

- **Реалистичный рукописный текст:** Имитация фотографии, сделанной "подчерком" человека, с настройкой наклона, разброса и расстояния между строками.
- **Параметры текста:** Помимо самого текста, доступны подробные метаданные — параметры, влияющие на визуальное отображение.
- **Визуализация обучения:** Использование библиотек [p5.js](https://p5js.org/) и [Charts.js](https://www.chartjs.org/) для динамической визуализации статистики обучения от сервера.
- **Технологии рендеринга:** Применение технологий `canvas context2d` и `WebGL` для оптимальной отрисовки графики.

## Технологии

- **p5.js:** Для создания интерактивной графики и анимаций.
- **Charts.js:** Для визуализации статистики и отображения динамики обучения.
- **Canvas API (2D context):** Для рендеринга стандартной графики.
- **WebGL:** Для ускоренной и качественной отрисовки сложных визуальных эффектов.
- **Vite:** Современный сборщик для разработки и быстрого обновления проекта.
- **Современный JavaScript:** Использование ECMAScript модулей и новейших возможностей языка.

## Установка

Для установки зависимостей проекта выполните следующие шаги:

1. **Клонируйте репозиторий:**
   ```sh
   git clone https://github.com/yourusername/text-image-generator.git
   cd text-image-generator
   ```

2. **Установите зависимости:**
   ```sh
   npm install
   ```

## Начало работы

Проект использует [Vite](https://vitejs.dev/) для браузерной разработки, что обеспечивает быструю сборку и горячую перезагрузку.

### Запуск проекта в режиме разработки

Для запуска проекта выполните следующую команду:
```sh
npm run dev
```
После этого Vite запустит сервер разработки, и вы сможете открыть приложение в браузере по указанному URL (обычно [http://localhost:3000](http://localhost:3000)).

### Сборка проекта для продакшена

Чтобы собрать проект для продакшена, выполните:
```sh
npm run build
```
Результат сборки будет сохранен в папке `dist`, которую можно развернуть на вашем веб-сервере.

## Настройка взаимодействия с сервером

Проект поддерживает интеграцию с серверной частью для обучения нейросети. Для настройки взаимодействия:
1. Укажите URL сервера и параметры обучения в файле конфигурации.
2. При запуске приложение автоматически подключится к серверу и начнет обмен данными для отображения статистики обучения.

## Вклад и развитие

Мы рады принять ваш вклад в развитие проекта! Если вы хотите внести изменения или предложить улучшения, пожалуйста, создайте [issue](https://github.com/yourusername/text-image-generator/issues) или отправьте pull request.

## Лицензия

Этот проект распространяется под [MIT License](LICENSE).
