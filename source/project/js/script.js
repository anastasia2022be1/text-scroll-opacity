"use strict";

function textOpacityScroll() {
    const items = document.querySelectorAll('.text-section');
    if (items.length) {
        items.forEach(item => {
            const itemValue = item.querySelector('.text-section__value');
            const itemMask = item.querySelector('.text-section__mask');
            if (!itemValue || !itemMask) return;

            const itemSpeed = +itemValue.dataset.textSpeed || 500;
            const itemOpacity = +itemValue.dataset.textOpacity || 0.2;

            // Оборачиваем слова в span
            itemValue.innerHTML = itemValue.innerText.replace(
                /([A-Za-z0-9'-,.&!?+<>]+)/g,
                `<span style="transition: opacity ${itemSpeed}ms; opacity: ${itemOpacity}">$1</span>`
            );

            const itemWords = itemValue.querySelectorAll('span');

            // Scroll event
            window.addEventListener('scroll', function () {
                const maskPosition = itemMask.getBoundingClientRect().top - window.innerHeight;
                const itemWay = Math.abs(maskPosition) / (window.innerHeight + itemMask.offsetHeight) * 100;
                const currentWord = maskPosition <= 0 ? Math.floor(itemWords.length / 100 * itemWay) : -1;
                addOpacity(itemWords, currentWord);
            });
        });
    }

    function addOpacity(itemWords, currentWord) {
        itemWords.forEach((itemWord, index) => {
            itemWord.style.opacity = currentWord >= 0 && index <= currentWord ? 1 : 0.2;
        });
    }
}

textOpacityScroll();
