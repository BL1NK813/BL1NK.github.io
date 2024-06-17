document.addEventListener('DOMContentLoaded', function() {
    const dotsElement = document.getElementById('dots');
    let dotCount = 0;

    const changeDots = () => {
        dotCount = (dotCount + 1) % 4;
        dotsElement.textContent = '.'.repeat(dotCount);
    };

    const intervalId = setInterval(changeDots, 500);

    setTimeout(function() {
        clearInterval(intervalId);
        document.getElementById('progress_few').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 3500);

    let currentProgress = 0;
    let energyTap = 500; /* Энергия */
    const energyTapMax = 500; /* Макс энергия */
    const energyTapDecrement = 10; /* Сколько энергии отнимается */
    let coinsProgress = 0; /* Количество монет */
    const coinsIncrement = 3; /* Сколько монет прибавляется */
    const coinsPerFullProgress = 100; /* Количество монет для 100% прогресса */

    const button = document.getElementById('image-button');
    let isMouseDown = false;
    let isClickHandled = false; // Флаг для предотвращения двойного нажатия

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

    function handleClick(event) {
        if (!isClickHandled && energyTap >= energyTapDecrement) {
            isClickHandled = true; // Устанавливаем флаг обработки клика

            energyTap -= energyTapDecrement;
            coinsProgress += coinsIncrement;
            updateEnergyDisplay();
            updateCoinsProgressDisplay();

            // Получаем координаты клика относительно .coin
            const rect = event.currentTarget.getBoundingClientRect();
            const posX = event.clientX - rect.left;
            const posY = event.clientY - rect.top;

            showCoinNotification(`+${coinsIncrement} монет`, posX, posY);

            // Увеличиваем прогресс
            increaseProgress();

            // Сбрасываем флаг обработки клика через короткое время, чтобы позволить новым кликам обрабатываться
            setTimeout(() => {
                isClickHandled = false;
            }, 200);
        }

        if (isMouseDown) {
            setTimeout(() => handleClick(event), 100);
        }
    }

    function increaseProgress() {
        const progressElement = document.getElementById('progress');
        const stagePodElement1 = document.getElementById('stage_pod_id1');
        const stagePodElement2 = document.getElementById('stage_pod_id2');

        // Пересчитываем прогресс на основе количества монет
        currentProgress = Math.floor((coinsProgress / coinsPerFullProgress) * 100);
        progressElement.style.width = currentProgress + '%';

        // Если достигнут 100% прогресса, сбрасываем и увеличиваем счетчик
        if (currentProgress >= 100) {
            currentProgress = 0;
            coinsProgress = 0; // Сбрасываем прогресс монет
            stagePodElement1.textContent = `${parseInt(stagePodElement1.textContent) + 1}/10`;
            stagePodElement2.textContent = `${parseInt(stagePodElement2.textContent) + 1}/10`;
        }

        // Обновляем отображение прогресса
        stagePodElement1.textContent = `${parseInt(stagePodElement1.textContent.split('/')[0])}/10`;
        stagePodElement2.textContent = `${parseInt(stagePodElement2.textContent.split('/')[0])}/10`;
    }

    function restoreEnergy() {
        if (energyTap < energyTapMax) {
            energyTap += 1; // Скорость восстановления энергии
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

    function showCoinNotification(message, x, y) {
        const notification = document.createElement('div');
        notification.className = 'coin-notification';
        notification.innerText = message;
        notification.style.left = `${x}px`;
        notification.style.top = `${y}px`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 1000);
    }
});
