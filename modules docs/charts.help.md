### 📌 **Шпаргалка по Chart.js (с примерами)**
Chart.js — мощная библиотека для визуализации данных в браузере.

---

## 🔹 **1. Подключение и инициализация**
### ✅ **Подключение (через npm/Vite)**
```js
import { Chart, registerables } from "chart.js";
Chart.register(...registerables); // Обязательно регистрируем все необходимые компоненты
```

### ✅ **Добавление HTML-элемента**
```html
<canvas id="myChart"></canvas>
```

### ✅ **Создание графика (пример)**
```js
const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
    type: "line", // Тип графика (линейный)
    data: {
        labels: ["Янв", "Фев", "Мар", "Апр", "Май"],
        datasets: [
            {
                label: "Продажи",
                data: [10, 20, 15, 30, 25],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.3)",
                borderWidth: 2,
                fill: true,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
    },
});
```

---

## 🔹 **2. Регистрация компонентов**
Если при рендере появляются ошибки (`"category" is not a registered scale"` или `"line" is not a registered controller"`), нужно вручную зарегистрировать компоненты:
```js
import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
} from "chart.js";

Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
);
```

---

## 🔹 **3. Типы графиков**
```js
type: "line" // Линейный график
type: "bar"  // Гистограмма
type: "pie"  // Круговая диаграмма
type: "doughnut" // Кольцевая диаграмма
type: "radar" // Радарная диаграмма
type: "polarArea" // Полярная диаграмма
type: "scatter" // Точечный график
type: "bubble" // Пузырьковый график
```

---

## 🔹 **4. Настройка осей**
### ✅ **Настройка категориальной шкалы (X-ось)**
```js
options: {
    scales: {
        x: {
            type: "category",
            labels: ["Пн", "Вт", "Ср", "Чт", "Пт"]
        }
    }
}
```

### ✅ **Настройка числовой шкалы (Y-ось)**
```js
scales: {
    y: {
        beginAtZero: true, // Начало оси с 0
        suggestedMax: 50, // Максимальное значение
        ticks: {
            stepSize: 10, // Шаг значений
        }
    }
}
```

---

## 🔹 **5. Кастомизация данных**
### ✅ **Изменение цвета линий и точек**
```js
datasets: [
    {
        label: "Доход",
        data: [10, 20, 15, 30, 25],
        borderColor: "red", 
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        pointBackgroundColor: "black",
        pointRadius: 5, // Размер точек
        borderWidth: 2,
    }
]
```

### ✅ **Градиентный фон**
```js
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(255, 0, 0, 0.5)");
gradient.addColorStop(1, "rgba(255, 255, 0, 0)");

datasets: [
    {
        label: "Градиент",
        data: [15, 30, 10, 40, 20],
        borderColor: "red",
        backgroundColor: gradient,
        fill: true,
    }
]
```

---

## 🔹 **6. Легенда и подписи**
### ✅ **Настройка легенды**
```js
options: {
    plugins: {
        legend: {
            display: true,
            position: "top", // "top", "bottom", "left", "right"
            labels: {
                color: "black",
                font: {
                    size: 14,
                    weight: "bold",
                }
            }
        }
    }
}
```

### ✅ **Настройка заголовка графика**
```js
options: {
    plugins: {
        title: {
            display: true,
            text: "Продажи за месяц",
            font: {
                size: 18
            }
        }
    }
}
```

---

## 🔹 **7. Анимации**
```js
options: {
    animation: {
        duration: 2000, // Длительность анимации (мс)
        easing: "easeInOutBounce", // Вид анимации
    }
}
```

---

## 🔹 **8. Обновление данных в реальном времени**
### ✅ **Добавление новых точек**
```js
myChart.data.labels.push("Июн");
myChart.data.datasets[0].data.push(35);
myChart.update();
```

### ✅ **Удаление последней точки**
```js
myChart.data.labels.pop();
myChart.data.datasets[0].data.pop();
myChart.update();
```

---

## 🔹 **9. Всплывающие подсказки**
```js
options: {
    plugins: {
        tooltip: {
            enabled: true,
            mode: "nearest",
            intersect: false,
            callbacks: {
                label: function (tooltipItem) {
                    return `Продажи: ${tooltipItem.raw}₽`;
                }
            }
        }
    }
}
```

---

## 🔹 **10. Гистограмма (пример)**
```js
const ctx = document.getElementById("barChart").getContext("2d");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Янв", "Фев", "Мар", "Апр"],
        datasets: [
            {
                label: "Доход",
                data: [100, 200, 150, 300],
                backgroundColor: ["red", "blue", "green", "yellow"],
                borderColor: "black",
                borderWidth: 1,
            }
        ]
    },
    options: {
        scales: {
            y: { beginAtZero: true }
        }
    }
});
```

---

## 🎯 **Заключение**
Эта шпаргалка поможет быстро освоить **Chart.js**. Если тебе нужна поддержка кастомных плагинов или других продвинутых фич, можно посмотреть [официальную документацию](https://www.chartjs.org/docs/latest/). 🚀

Если есть вопросы — спрашивай! 😎