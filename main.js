document.addEventListener('DOMContentLoaded', function() {
    let energyTap = 500; /* Энергия */
    let isMouseDown = false;
    let isClickHandled = false; // Флаг для предотвращения двойного нажатия
    const energyTapMax = 500; /* Макс энергия */
    const energyTapDecrement = 9; /* Сколько энергии отнимается */
    const coinsIncrement = 3; /* Сколько монет прибавляется */
    const coinsInSecond = 100;
    const button = document.querySelector('.coin_button');

    button.addEventListener('mousedown', function(event) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        button.style.transition = 'transform 0.2s ease';
        requestAnimationFrame(() => {
            button.style.transform = `rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
        });
    });

    button.addEventListener('mouseup', function() {
        button.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
        requestAnimationFrame(() => {
            button.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    button.addEventListener('mouseout', function() {
        button.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
        requestAnimationFrame(() => {
            button.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    // Обработка нажатия мыши
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('touchstart', handleMouseDown); // Для сенсорных экранов

    // Обработка отпускания мыши
    button.addEventListener('mouseup', handleMouseUp);
    button.addEventListener('touchend', handleMouseUp); // Для сенсорных экранов

    function handleMouseDown(event) {
        isMouseDown = true;
        button.style.transform = 'scale(0.9)';
        button.style.webkitTransform = 'scale(0.9)';
        handleClick(event);
    }

    function handleMouseUp() {
        isMouseDown = false;
        button.style.transform = 'scale(1)';
        button.style.webkitTransform = 'scale(1)';
    }

    // Устанавливаем интервал для восстановления энергии каждую секунду
    setInterval(restoreEnergy, 1030);

    // Устанавливаем интервал для пассивного увеличения монет каждую секунду
    setInterval(increaseFarmCoinsPassively, 36000);

    function handleClick(event) {
        if (isMouseDown && !isClickHandled && energyTap >= energyTapDecrement) {
            isClickHandled = true; // Устанавливаем флаг обработки клика

            energyTap -= energyTapDecrement;
            coinsProgress += coinsIncrement;
            updateEnergyDisplay();
            updateCoinsProgressDisplay();
            updateFarmCoinsDisplay();
            showCoinNotification(`+${coinsIncrement}`, event.clientX, event.clientY);

            // Увеличиваем прогресс
            increaseProgress();

            // Сбрасываем флаг обработки клика через короткое время, чтобы позволить новым кликам обрабатываться
            setTimeout(() => {
                isClickHandled = false;
            }, 190);
        }

        if (isMouseDown) {
            setTimeout(() => handleClick(event), 100);
        }
    }

    function restoreEnergy() {
        if (energyTap < energyTapMax) {
            energyTap += Math.ceil(((coinsInSecond/60)/60)); // Скорость восстановления энергии
            if (energyTap > energyTapMax) {
                energyTap = energyTapMax; // Предотвращаем превышение максимума
            }
            updateEnergyDisplay();
        }
    }

    function increaseFarmCoinsPassively() {
        const farmCoinsElement = document.getElementById('farm_coins_id');
        const currentFarmCoins = parseInt(farmCoinsElement.textContent) || 0;
        farmCoinsElement.innerHTML = `<img src="coin.png" alt="coin">${currentFarmCoins + 1}`;
    }

    function updateEnergyDisplay() {
        const energyDisplay = document.querySelector('.energy_tap');
        energyDisplay.innerHTML = `<img src="energy.png" alt="coin">${energyTap}/${energyTapMax}`;
    }

    function updateCoinsProgressDisplay() {
        const coinsProgressDisplay = document.querySelector('.farm_coins');
        coinsProgressDisplay.innerHTML = `<img src="coin.png" alt="coin">${coinsProgress}`;
    }

    function updateFarmCoinsDisplay() {
        const farmCoinsElement = document.getElementById('farm_coins_id');
        farmCoinsElement.innerHTML = `<img src="coin.png" alt="coin">${parseInt(farmCoinsElement.textContent) || 0}`;
    }
});
