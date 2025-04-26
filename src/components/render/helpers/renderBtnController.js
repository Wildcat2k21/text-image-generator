import { getRenderOptions } from "../../../helpers/getOptions";

export function RenderBtnController(btnElement, renderController, startRenderCallback = () =>{}){
    const eventCallback = async ({ target }) => {
        const renderOptions = getRenderOptions(this);
        if(!target.pauseFlag){
            target.textContent = "Пауза ⏳";
            target.style.backgroundColor = "#ffdf31";
    
            // Инициализируем контроллер рендера
            if(!renderController.renderIsStarted){
                startRenderCallback(renderOptions);
                await renderController.init();
                renderController.startRender(renderOptions).then(() => {
                    confirm("Рендер был завершен ℹ️");
                    target.textContent = "Создать датасет";
                    target.style.backgroundColor = "#98e674";
                    target.pauseFlag = false;
                });
            }
            // Возобновляем рендер
            else {
                renderController.resumeRender();
            }
        }
        // Пауза
        else{
            target.textContent = "Продолжить 🚀";
            target.style.backgroundColor = "#65e1f5";
            renderController.pauseRender();
        }
                    
        // Переключаем флаг кнопки
        target.pauseFlag = !target.pauseFlag;
    };

    btnElement.addEventListener("click", eventCallback);
};