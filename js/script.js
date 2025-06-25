"use strict"; // Включает строгий режим — помогает ловить ошибки и запрещает неявные действия
              
function textOpacityScroll() {
    const items = document.querySelectorAll('.text-section'); 
    // Находим все блоки с классом .text-section

    if (items.length) {
        items.forEach(item => {
            const itemValue = item.querySelector('.text-section__value');
            const itemMask = item.querySelector('.text-section__mask');
            // Внутри каждого блока ищем текст и маску

            if (!itemValue || !itemMask) return;
            // Если какой-то из элементов не найден — пропускаем этот блок

            const itemSpeed = +itemValue.dataset.textSpeed || 500;
            const itemOpacity = +itemValue.dataset.textOpacity || 0.2;
            // Получаем значения из атрибутов data-text-speed и data-text-opacity
            // Если не заданы — устанавливаем значения по умолчанию: 500 мс и 0.2

            // Заменяем текст на набор <span> с анимацией и прозрачностью
            itemValue.innerHTML = itemValue.innerText.replace(
                /([A-Za-z0-9'-,.&!?+<>]+)/g, // регулярное выражение: выбирает слова и символы
                `<span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity}">$1</span>`
            );

            const itemWords = itemValue.querySelectorAll('span');
            // Получаем все span-элементы, которые теперь оборачивают слова

            // Вешаем обработчик прокрутки
            window.addEventListener('scroll', function () {
                const maskPosition = itemMask.getBoundingClientRect().top - window.innerHeight;
                // Определяем, насколько маска выше или ниже видимой области экрана

                const itemWay = Math.abs(maskPosition) / (window.innerHeight + itemMask.offsetHeight) * 100;
                // Вычисляем прогресс прокрутки в процентах относительно высоты экрана и маски

                const currentWord = maskPosition <= 0
                    ? Math.floor(itemWords.length / 100 * itemWay)
                    : -1;
                // Определяем индекс текущего слова, которое должно быть видно
                // Если маска ещё не дошла до видимой области — ничего не показываем

                addOpacity(itemWords, currentWord);
                // Устанавливаем прозрачность для слов
            });
        });
    }

    // Функция для управления прозрачностью слов
    function addOpacity(itemWords, currentWord) {
        itemWords.forEach((itemWord, index) => {
            itemWord.style.opacity = currentWord >= 0 && index <= currentWord ? 1 : 0.2;
            // Если индекс текущего слова <= вычисленного — делаем слово полностью видимым
            // Остальные — полупрозрачные
        });
    }
}

textOpacityScroll();
// Запускаем основную функцию при загрузке страницы
