let tg = window.Telegram.WebApp;
tg.expand(2000);
setTimeout(function() {
    tg.expand();
}, 2000);

document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-button');
    const navContents = document.querySelectorAll('.nav-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Удаляем класс active со всех кнопок и контента
            navButtons.forEach(btn => btn.classList.remove('active'));
            navContents.forEach(content => content.classList.remove('active'));

            // Добавляем класс active к текущей кнопке и контенту
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Устанавливаем активную первую вкладку по умолчанию
    navButtons[0].classList.add('active');
    navContents[0].classList.add('active');
});

/*До document.addEventListener('DOMContentLoaded', function() { не трогай. Обработчик нажатия монетки работать не будет*/
let currentProgress = 0;
const coinsPerFullProgress = 100; /* Количество монет для 100% прогресса */
let coinsProgress = 0; /* Количество монет */

// Функция для увеличения прогресса
function increaseProgress() {
    const stagePodElement1 = document.getElementById('stage_pod_id1');
    const stagePodElement2 = document.getElementById('stage_pod_id2');
    const progressElement = document.getElementById('progress');

    // Пересчитываем прогресс на основе количества монет
    currentProgress = Math.floor((coinsProgress / coinsPerFullProgress) * 100);
    progressElement.style.width = currentProgress + '%';

    // Если достигнут 100% прогресса, сбрасываем и увеличиваем счетчик
    if (currentProgress >= 100) {
        currentProgress = 0;
        progressElement.style.width = 0 + '%';
        stagePodElement1.textContent = `${parseInt(stagePodElement1.textContent) + 1}/10`;
        stagePodElement2.textContent = `${parseInt(stagePodElement2.textContent) + 1}/10`;
    }

    // Обновляем отображение прогресса
    stagePodElement1.textContent = `${parseInt(stagePodElement1.textContent.split('/')[0])}/10`;
    stagePodElement2.textContent = `${parseInt(stagePodElement2.textContent.split('/')[0])}/10`;
}

/*Предзагрузка страницы*/
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
    }, 100);

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
            button.style.transform = `rotateX(${-y / 5}deg) rotateY(${x / 5}deg) scale(0.9)`;
        });
    });

    button.addEventListener('mouseup', function() {
        button.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
        requestAnimationFrame(() => {
            button.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    button.addEventListener('mouseout', function() {
        button.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
        requestAnimationFrame(() => {
            button.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    button.addEventListener('touchstart', function(event) {
        handleMouseDown(event.touches[0]);
    }, { passive: true });

    button.addEventListener('touchend', function() {
        handleMouseUp();
    }, { passive: true });

    function handleMouseDown(event) {
        isMouseDown = true;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        handleClick(event);

        button.style.transition = 'transform 0.2s ease';
        requestAnimationFrame(() => {
            button.style.transform = `rotateX(${-y / 5}deg) rotateY(${x / 5}deg) scale(0.9)`;
        });
    }

    function handleMouseUp() {
        isMouseDown = false;
        button.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
        requestAnimationFrame(() => {
            button.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    setTimeout(() => {
        button.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }, 400);




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

    function showCoinNotification(message, x, y) {
        const notification = document.createElement('div');
        notification.className = 'coin-notification';
        notification.innerText = message;
        notification.style.left = `${x}px`;
        notification.style.top = `${y}px`;
        document.body.appendChild(notification);

        // Анимация появления
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });

        // Удаление уведомления через 1 секунду
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 500);
    }
});
